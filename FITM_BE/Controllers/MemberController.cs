using FITM_BE.Service.MemberService;
using FITM_BE.Service.MemberService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FITM_BE.Entity;
using FITM_BE.Service;
using System.Security.Claims;

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
        [Authorize]
        public async Task<ProfileDto>Get()
        {
            var userId = int.Parse(User.FindFirstValue("UserID"));
            return await _memberService.Get(userId);
        }
    }
}