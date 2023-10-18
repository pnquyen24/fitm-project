using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;

namespace FITM_BE.Service.PracticalDetailService.Dto
{
    [AutoMap(typeof(PracticalDetail), ReverseMap = true)]
    public class ViewAttendanceDto
    {
        public int Id { get; set; }
        public int PracticalScheduleId { get; set; }
        public int MemberId { get; set; }
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public AttendanceStatus Attendance { get; set; }
    }
}
