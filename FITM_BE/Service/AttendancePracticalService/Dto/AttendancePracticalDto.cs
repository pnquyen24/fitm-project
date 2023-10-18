using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.AttendancePracticalService.Dtos
{
    [AutoMap(typeof(AttendancePractical), ReverseMap = true)]
    public class AttendancePracticalDto
    {
        public int Id { get; set; }
        public int PracticalScheduleId { get; set; }
        public int MemberId { get; set; }
        public bool Attendance { get; set; }
    }
}