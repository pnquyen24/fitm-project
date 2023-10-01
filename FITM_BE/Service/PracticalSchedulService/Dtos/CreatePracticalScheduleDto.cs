using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.PracticalSchedulService.Dtos
{
    [AutoMap(typeof(PracticalSchedule), ReverseMap = true)]
    public class CreatePracticalScheduleDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Room { get; set; }
        public string BackgroundColor { get; set; }
        public string TextColor { get; set; }
    }
}
