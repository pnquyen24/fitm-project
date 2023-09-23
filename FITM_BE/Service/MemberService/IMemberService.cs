using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Entity;

namespace FITM_BE.Service.MemberService
{
    public interface IMemberService
    {
        public IEnumerable<MemberGeneratedDto> GetAll();
        public Task<MemberGeneratedDto> Create(CreateMemberDto memberDto);

        public Task<ViewProfileDto> Get(int id);
    }
}
