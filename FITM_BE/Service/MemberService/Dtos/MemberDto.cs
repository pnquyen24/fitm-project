using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.MemberService.Dtos
{
    [AutoMap(typeof(Member), ReverseMap =true)]
    public class MemberDto
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
