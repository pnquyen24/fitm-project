using FITM_BE.Service.MemberService.Dtos;

namespace FITM_BE.Service.MemberService
{
    public interface IMemberService
    {
        public IEnumerable<MemberGeneratedDto> GetAll();
        public Task<MemberGeneratedDto> Create(CreateMemberDto memberDto);
    }
}
