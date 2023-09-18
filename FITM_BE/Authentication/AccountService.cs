using FITM_BE.Authentication.Dtos;
using FITM_BE.Entity;
using FITM_BE.Service;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace FITM_BE.Authentication
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly IPasswordHasher<Member> _passwordHasher;

        public AccountService(IRepository repository, IPasswordHasher<Member> passwordHasher) : base(repository)
        {
            _passwordHasher = passwordHasher;
        }

        public async Task<AcountDTO> GenerateAccount(string fullname)
        {
            var password = GeneratePassword(8, true);
            var username = fullname.GenerateUserName();
            Member newMember = new()
            {
                Username = username,
                Password = password,
            };

            password = _passwordHasher.HashPassword(newMember, password);
            newMember.Password = password;

            await _repository.Add(newMember);
            return new AcountDTO { UserName = username, Password = password };
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
    }
}
