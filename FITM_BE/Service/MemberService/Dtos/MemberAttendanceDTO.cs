using FITM_BE.Enums;

namespace FITM_BE.Service.MemberService.Dtos
{
    public class MemberAttendanceDTO
    {
        public int Id { get; set; }
        public AttendanceStatus Attendance { get; set; }
    }
}
