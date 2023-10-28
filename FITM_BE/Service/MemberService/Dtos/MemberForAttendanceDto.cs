using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;

namespace FITM_BE.Service.MemberService.Dtos
{
    [AutoMap(typeof(Member), ReverseMap = true)]
    public class MemberForAttendanceDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string StudentID { get; set; }
        public AttendanceStatus Attendance { get; set; }
    }
}
