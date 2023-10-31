using FITM_BE.Enums;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Service.SongService.Dtos;

namespace FITM_BE.Service.PerformanceScheduleService.Dtos
{
    public class PerformanceDetail
    {   
        public int Id { get; set; }
        public string Name { get; set; }
        public string Place { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string BackgroundImg { get; set; } = "";
        public List<SongPerformanceDTO>? Songs { get; set; }
        public List<MemberPerformanceDTO>? Members { get; set; }
    }
}
