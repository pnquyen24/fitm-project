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
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MemberController(IMemberService member, IHttpContextAccessor httpContextAccessor)
        {
            _memberService = member;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        public async Task<MemberGeneratedDto> Create(CreateMemberDto createMemberDto)
        {
            return await _memberService.Create(createMemberDto);
        }

        [HttpGet]
        [Authorize]
        public async Task<ViewProfileDto>Get()
        {         
            return await _memberService.Get(int.
                Parse(_httpContextAccessor.HttpContext.User.FindFirstValue("UserID")));
        }
    }
}