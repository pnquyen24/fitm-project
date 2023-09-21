using AutoMapper;
using FITM_BE.Authentication.Dtos;
using FITM_BE.Entity;
using FITM_BE.Service;
using FITM_BE.Service.EmailService;
using FITM_BE.Service.LoggerService;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace FITM_BE.Authentication
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly IPasswordHasher<Member> _passwordHasher;
        private readonly IEmailSender _emailSender;

        public AccountService(IRepository repository, IMapper mapper, IPasswordHasher<Member> passwordHasher, IEmailSender emailSender) : base(repository, mapper)
        {
            _passwordHasher = passwordHasher;
            _emailSender = emailSender;
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

        public async Task<bool> ForgotPassword(string email)
        {
            Member member = await CheckExistEmail(email);
            if (member.Id != 0)
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
        
        private async Task<Member> CheckExistEmail(string email)
        {
            Member member = await _repository
                                .GetAll<Member>()
                                .Where(m => m.Email.Equals(email))
                                .FirstOrDefaultAsync()
                                ?? new Member();
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
    }
}