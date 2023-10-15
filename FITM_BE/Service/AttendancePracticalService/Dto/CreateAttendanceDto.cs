using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.AttendancePracticalService.Dto
{
    [AutoMap(typeof(AttendancePractical), ReverseMap = true)]
    public class CreateAttendanceDto
    {
        public int PracticalScheduleId { get; set; }
        public int MemberId { get; set; }
    }
}
