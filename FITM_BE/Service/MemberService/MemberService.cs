using AutoMapper;
using FITM_BE.Authentication;
using FITM_BE.Entity;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.MemberService
{
    public class MemberService : ServiceBase, IMemberService
    {
        private readonly IAccountService _accountService;

        public MemberService(IRepository repository, IMapper mapper, IAccountService accountService) : base(repository, mapper)
        {
            _accountService = accountService;
        }

        public async Task<MemberGeneratedDto> Create(CreateMemberDto createMemberDto)
        {
            var newMember = _mapper.Map<Member>(createMemberDto);
            _accountService.GenerateAccount(ref newMember, out string newPassword);

            newMember.Status = true;

            var member = await _repository.Add(newMember);
            member.Password = newPassword;

            return _mapper.Map<MemberGeneratedDto>(member);
        }

        public IEnumerable<MemberGeneratedDto> GetAll()
        {
            return _repository.GetAll<Member>().Select(member => _mapper.Map<MemberGeneratedDto>(member));
        }

        public Member ViewProfile(int id)
        {
            return _repository.GetAll<Member>().FirstOrDefault(m => m.Id == id);
        }
    }
}