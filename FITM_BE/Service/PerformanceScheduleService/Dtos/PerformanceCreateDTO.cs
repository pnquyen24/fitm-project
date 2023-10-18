using FITM_BE.Service.SongService.Dtos;

namespace FITM_BE.Service.PerformanceScheduleService.Dtos
{
    public class PerformanceCreateDTO
    {
        public string Name { get; set; }
        public string Place { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string BackgroundImg { get; set; }
        public List<int> SongIDs { get; set; }
    }
}
