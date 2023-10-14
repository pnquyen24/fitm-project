using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.AttendancePracticalService.Dtos
{
    [AutoMap(typeof(AttendancePractical), ReverseMap = true)]
    public class UpdateAttendanceDto
    {
        public int Id { get; set; }
        public bool Attendance { get; set; }
    }
}
