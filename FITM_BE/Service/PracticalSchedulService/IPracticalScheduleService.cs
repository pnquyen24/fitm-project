using FITM_BE.Service.PracticalSchedulService.Dtos;

namespace FITM_BE.Service.PracticalSchedulService
{
    public interface IPracticalScheduleService
    {
        public IQueryable<PracticalScheduleDto> ViewPracticalSchedules();
        public Task<PracticalScheduleDto> GetPracticalSchedule(int id);
        public Task<PracticalScheduleDto> AddPracticalSchedule(CreatePracticalScheduleDto scheduleDto);
        public Task<PracticalScheduleDto> UpdatePracticalSchedule(PracticalScheduleDto scheduleDto);
        public Task DeletePracticalSchedule(int id);
    }
}