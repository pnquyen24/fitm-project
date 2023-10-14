using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.AttendancePracticalService.Dtos
{
    [AutoMap(typeof(AttendancePractical), ReverseMap = true)]
    public class AttendancePracticalDto
    {
        public int Id { get; set; }
        public int ScheduleId { get; set; }
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public bool Attendance { get; set; }
    }
}
