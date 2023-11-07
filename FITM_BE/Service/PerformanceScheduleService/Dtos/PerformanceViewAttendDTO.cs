using FITM_BE.Service.MemberService.Dtos;

namespace FITM_BE.Service.PerformanceScheduleService.Dtos
{
	public class PerformanceViewAttendDTO
    {
        public int PerformanceId { get; set; }
        public List<MemberForAttendanceDto> Members {get; set;}
       
    }
}
