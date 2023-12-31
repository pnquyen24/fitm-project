﻿using AutoMapper;
using FITM_BE.Authentication;
using FITM_BE.Authorization.Role;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.EmailService;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;

namespace FITM_BE.Service.MemberService
{
    public class MemberService : ServiceBase, IMemberService
    {
        private readonly IAccountService _accountService;
        private readonly IEmailSender _emailSender;

        public MemberService(IRepository repository, IMapper mapper, IAccountService accountService, IEmailSender emailSender) : base(repository, mapper)
        {
            _accountService = accountService;
            _emailSender = emailSender;
        }

        public async Task<MemberGeneratedDto> Create(CreateMemberDto createMemberDto)
        {
            createMemberDto.FullName = createMemberDto.FullName.Trim();
            var existingMember = await CheckExistEmail(createMemberDto.Email);
            if (existingMember != null)
            {
                throw new InvalidException("Email has been exist");
            }

            var newMember = _mapper.Map<Member>(createMemberDto);
            _accountService.GenerateAccount(ref newMember, out string newPassword);

            newMember.Status = true;

            var member = await _repository.Add(newMember);
            member.Password = newPassword;

            await SendNewAccountEmail(member.Email, member.Username, member.Password);

            return _mapper.Map<MemberGeneratedDto>(member);
        }
        private async Task SendNewAccountEmail(string email, string username, string password)
        {
            var message = new Message
            (
                new string[]
                {
            email
                },
                "New Account",
                "<p>This is your new account:</p>" +
                "<ul>" +
                "<li>Username: " + username + "</li>" +
                "<li>Password: " + password + "</li>" +
                "</ul>"
            );
            await _emailSender.SendEmailAsync(message);
        }

        private async Task<Member?> CheckExistEmail(string email)
        {
            Member? member = await _repository
                                .GetAll<Member>()
                                .FirstOrDefaultAsync(m => m.Email.Equals(email));
            return member;
        }

        public IEnumerable<MemberGeneratedDto> GetAll()
        {
            return _repository.GetAll<Member>().Select(member => _mapper.Map<MemberGeneratedDto>(member));
        }

        public IQueryable<ProfileDto> getAllProfile()
        {
            IQueryable<ProfileDto> profileDtos =
                 _repository.GetAll<Member>().OrderByDescending(m => m.Status).Select(request => _mapper.Map<ProfileDto>(request));
            return profileDtos;
        }
        public async Task<ProfileDto> Get(int id)
        {
            var member = _repository.GetAll<Member>().Include(m => m.Roles).FirstOrDefault(m => m.Id == id);
            if (member == null) throw new  NotFoundException("Not Found member");
            var profile = _mapper.Map<ProfileDto>(member);
            profile.Roles  = member.Roles.Select(role => role.RoleName).ToList();
            return profile;
        }
        public async Task<ProfileDto> ChangeStatus(int id)
        {;
            var profile = _repository.Get<Member>(id);
            if (profile == null) throw new NotFoundException("Not Found member");
            var status = profile.Status = !profile.Status;
            var member = await _repository.Update(profile);
            return _mapper.Map<ProfileDto>(member); 
        }
    }
}