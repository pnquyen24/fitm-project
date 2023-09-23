using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.MemberService.Dtos
{
    [AutoMap(typeof(Member), ReverseMap = true)]
    public class ViewProfileDto
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string StudentID { get; set; }
        public DateTime DOB { get; set; }
        public string PhoneNumber { get; set; }
        public string BankName { get; set; }
        public string BankNumber { get; set; }
        public string Avatar { get; set; }
    }
}
