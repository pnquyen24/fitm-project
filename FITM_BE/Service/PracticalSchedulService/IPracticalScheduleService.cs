using FITM_BE.Service.PracticalSchedulService.Dtos;

namespace FITM_BE.Service.PracticalSchedulService
{
    public interface IPracticalScheduleService
    {
        public IQueryable<PracticalScheduleDto> ViewPracticalSchedules();
        public Task<PracticalScheduleDto> GetPracticalSchedule(int id);
        public Task AddPracticalSchedule(PracticalScheduleDto schedule);
        public Task UpdatePracticalSchedule(PracticalScheduleDto schedule);
        public Task DeletePracticalSchedule(int id);
    }
}