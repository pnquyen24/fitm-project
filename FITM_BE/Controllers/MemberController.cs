using FITM_BE.Service.MemberService;
using FITM_BE.Service.MemberService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FITM_BE.Entity;
using FITM_BE.Service;

namespace FITM_BE.Controllers
{
    //[Authorize]
    public class MemberController : ApiBase
    {
        private readonly IMemberService _memberService;
        public MemberController(IMemberService member)
        {
            _memberService = member;
        }

        [HttpPost]
        public async Task<MemberGeneratedDto> Create(CreateMemberDto createMemberDto)
        {
            return await _memberService.Create(createMemberDto);
        }

        [HttpGet]
        public ActionResult<Member> Get(int id)
        {
            var member = _memberService.ViewProfile(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }
    }
}
