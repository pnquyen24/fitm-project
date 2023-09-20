using AutoMapper.Execution;
using FITM_BE.Service.MemberService;
using FITM_BE.Service.Test;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    public class MemberController : ApiBase
    {
        private readonly MemberService memberService;
        public MemberController(MemberService member)
        {
            this.memberService = member;
        }

       
    }
}
