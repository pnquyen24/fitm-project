using AutoMapper;
using FITM_BE.Authentication.Dtos;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service;
using FITM_BE.Service.EmailService;
using Microsoft.EntityFrameworkCore;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
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
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;

        public AccountService(IRepository repository, IMapper mapper, IPasswordHasher<Member> passwordHasher, IEmailSender emailSender, IConfiguration configuration) : base(repository, mapper)
        {
            _passwordHasher = passwordHasher;
            _emailSender = emailSender;
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

        public async Task<bool> ForgotPassword(string email)
        {
            Member? member = await CheckExistEmail(email);
            if (member != null)
            {
                string newPassword = GeneratePassword(8, true);
                string hashedPassword = _passwordHasher.HashPassword(member, newPassword);
                member.Password = hashedPassword;
                await _repository.Update<Member>(member);
                await SendEmail(email, newPassword);
                return true;
            }
            return false;
        }

        private async Task<Member?> CheckExistEmail(string email)
        {
            Member? member = await _repository
                                .GetAll<Member>()
                                .FirstOrDefaultAsync(m => m.Email.Equals(email));
            return member;
        }

        private async Task SendEmail(string email, string password)
        {
            var message = new Message
            (
                new string[]
                {
                    email
                },
                "New password (async)",
                "This is new your password: " + password
            );
            await _emailSender.SendEmailAsync(message);
        }

        public async Task<string> ChangePassword(AccountChangePasswordDTO accountChangePasswordDTO)
        {
            var member = await _repository.Get<Member>(accountChangePasswordDTO.Id);
            var hashResultCompare = _passwordHasher.VerifyHashedPassword(member, member.Password, accountChangePasswordDTO.OldPassword);

            if (hashResultCompare == PasswordVerificationResult.Failed)
            {
                throw new InvalidException();
            }
            else
            {
                var newPassword = _passwordHasher.HashPassword(member, accountChangePasswordDTO.NewPassword);
                member.Password = newPassword;

                await _repository.Update<Member>(member);
            }
            return "Password is changed!";
        }

       
    }
}