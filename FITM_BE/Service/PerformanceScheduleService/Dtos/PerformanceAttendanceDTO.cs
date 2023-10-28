using FITM_BE.Service.MemberService.Dtos;

namespace FITM_BE.Service.PerformanceScheduleService.Dtos
{
    public class PerformanceAttendanceDTO
    {
        public int PerformanceId { get; set; }
        public List<MemberAttendanceDTO> Members { get; set; }
    }
}
