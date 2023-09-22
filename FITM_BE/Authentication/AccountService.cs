using AutoMapper;
using FITM_BE.Authentication.Dtos;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace FITM_BE.Authentication
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly IPasswordHasher<Member> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AccountService(IRepository repository, IMapper mapper, IPasswordHasher<Member> passwordHasher, IConfiguration configuration) : base(repository, mapper)
        {
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        public void GenerateAccount(ref Member member, out string newPassword)
        {
            newPassword = GeneratePassword(8, true);
            var userName = member.FullName.GenerateUserName();
            var countDuplicate = _repository.GetAll<Member>()
                                            .Where(member => member.Username.StartsWith(userName))
                                            .ToList()
                                            .Where(member => Regex.IsMatch(member.Username.Replace(userName, ""), @"^\d*$"))
                                            .Count();
            if (countDuplicate > 0)
                userName += countDuplicate;

            member.Username = userName;
            member.Password = _passwordHasher.HashPassword(member, newPassword);
        }

        public string GeneratePassword(int length, bool isRandom)
        {
            if (isRandom)
            {
                const string chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@*";
                StringBuilder sb = new();
                Random random = new();

                for (int i = 0; i < length; i++)
                {
                    sb.Append(chars[random.Next(chars.Length)]);
                }

                return sb.ToString();
            }
            return "123qwe";
        }

        public async Task<string> Login(LoginDto login)
        {
            var member = await _repository.GetAll<Member>()
                                          .FirstOrDefaultAsync(member => member.Username.Equals(login.Username));
            if (member == null
                || _passwordHasher.VerifyHashedPassword(member, member.Password, login.Password) == PasswordVerificationResult.Failed)
            {
                throw new InvalidException("Username or password incorrect");
            }

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration.GetValue<string>("Jwt:Subject")),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserId", member.Id.ToString()),
                new Claim("Username", member.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Jwt:Key")));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("Jwt:Issuer"),
                audience: _configuration.GetValue<string>("Jwt:Audience"),
                claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: signIn
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
