using FITM_BE.Service.MemberService.Dtos;

namespace FITM_BE.Service.MemberService
{
    public interface IMemberService
    {
        public IEnumerable<MemberDto> GetAll();
        public Task<MemberDto> Create(MemberDto memberDto);
    }
}
