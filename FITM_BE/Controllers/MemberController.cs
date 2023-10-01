using FITM_BE.Service.MemberService;
using FITM_BE.Service.MemberService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FITM_BE.Entity;
using FITM_BE.Service;
using System.Security.Claims;
using Org.BouncyCastle.Bcpg;
using FITM_BE.Util.Pagging;

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
            return await _memberService.Get(int.Parse(User.FindFirstValue("UserID"))); 
        }

        [HttpGet]
        [Authorize]
        public async Task<ProfileDto> GetMemberById(int id)
        {
            return await _memberService.Get(id);
        }

        [HttpPost]
        [Authorize]

        public async Task<PaggingResultDto<ProfileDto>> GetAllPagging(PaggingDto paggingDto)
        {
            var query = _memberService.getAllProfile();
            return await query.GetGridResult(query, paggingDto);
        }
    }
}