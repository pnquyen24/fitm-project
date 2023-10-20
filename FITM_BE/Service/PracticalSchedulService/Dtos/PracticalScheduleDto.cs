using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.PracticalSchedulService.Dtos
{
    [AutoMap(typeof(PracticalSchedule), ReverseMap = true)]
    public class PracticalScheduleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public int Room { get; set; }
    }
}
