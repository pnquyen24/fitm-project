using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.MemberService
{
    public class MemberService : ServiceBase, IMemberService
    {
        public MemberService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<MemberDto> Create(MemberDto memberDto)
        {
            await _repository.Add(_mapper.Map<Member>(memberDto));
            return memberDto;
        }

        public IEnumerable<MemberDto> GetAll()
        {
            return _repository.GetAll<Member>().Select(member => _mapper.Map<MemberDto>(member));
        }
    }
}
