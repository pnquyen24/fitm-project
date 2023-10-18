using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.AttendancePracticalService.Dto
{
    [AutoMap(typeof(AttendancePractical), ReverseMap = true)]
    public class ViewAttendanceDto
    {
        public int Id { get; set; }
        public int PracticalScheduleId { get; set; }
        public int MemberId { get; set; }
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public bool Attendance { get; set; }
    }
}
