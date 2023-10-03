using AutoMapper;
using FITM_BE.Authentication;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.EmailService;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FITM_BE.Service.MemberService
{
    public class MemberService : ServiceBase, IMemberService
    {
        private readonly IAccountService _accountService;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;

        public MemberService(IRepository repository, IMapper mapper, IAccountService accountService, IEmailSender emailSender, IConfiguration configuration) : base(repository, mapper)
        {
            _accountService = accountService;
            _emailSender = emailSender;
            _configuration = configuration;
        }

        public async Task<MemberGeneratedDto> Create(CreateMemberDto createMemberDto)
        {
            var existingMember = await CheckExistEmail(createMemberDto.Email);
            if (existingMember != null)
            {
                throw new InvalidException("Email đã tồn tại");
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
                 _repository.GetAll<Member>().Select(request => _mapper.Map<ProfileDto>(request));
            return profileDtos;
        }
        public async Task<ProfileDto> Get(int id)
        {
            var member = await _repository.Get<Member>(id);
            return _mapper.Map<ProfileDto>(member);
        }
        public async Task<ProfileDto> ChangeStatus(int id)
        {;
            var profile = await _repository.Get<Member>(id);
            var status = profile.Status = !profile.Status;
            var member = await _repository.Update(profile);
            return _mapper.Map<ProfileDto>(member); 
        }
    }
}