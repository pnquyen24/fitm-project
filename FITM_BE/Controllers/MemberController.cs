using FITM_BE.Authorization.Utils;
using FITM_BE.Service.MemberService;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Util.Pagging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FITM_BE.Controllers
{
    [Policy(nameof(MemberController))]
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
        [Policy]
        public async Task<ProfileDto>Get()
        {       
            return await _memberService.Get(int.Parse(User.FindFirstValue("UserID"))); 
        }

        [HttpGet]
        public async Task<ProfileDto> GetMemberById(int id)
        {
            return await _memberService.Get(id);
        }

        [HttpPost]
        public async Task<PaggingResultDto<ProfileDto>> GetAllPagging(PaggingDto paggingDto)
        {
            var query = _memberService.getAllProfile();
            return await query.GetGridResult(query, paggingDto);
        }

        [HttpGet]
        public  IQueryable<ProfileDto> ExportMembers()
        {
            return  _memberService.getAllProfile();
        }

        [HttpPost]
        public Task<ProfileDto> ChangeStatus(int id) 
        {
            var profileDto = _memberService.ChangeStatus(id);

            return profileDto;
        }
    }
}