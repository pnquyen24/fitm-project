using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.PracticalSchedulService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.PracticalSchedulService
{
    public class PracticalScheduleService : ServiceBase, IPracticalScheduleService
    {
        public PracticalScheduleService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public IQueryable<PracticalScheduleDto> ViewPracticalSchedules()
        {
            IQueryable<PracticalScheduleDto> practicalScheduleDtos =
                _repository.GetAll<PracticalSchedule>().Select(schedule => _mapper.Map<PracticalScheduleDto>(schedule));
            return practicalScheduleDtos;
        }

        public async Task<PracticalScheduleDto> GetPracticalSchedule(int id)
        {
            PracticalSchedule schedule = await _repository.Get<PracticalSchedule>(id);
            return _mapper.Map<PracticalScheduleDto>(schedule);
        }

        public async Task<PracticalScheduleDto> AddPracticalSchedule(CreatePracticalScheduleDto practicalScheduleDto)
        {
            PracticalSchedule newSchedule = _mapper.Map<PracticalSchedule>(practicalScheduleDto);
            newSchedule = await _repository.Add(newSchedule);
            return _mapper.Map<PracticalScheduleDto>(newSchedule);
        }

        public async Task<PracticalScheduleDto> UpdatePracticalSchedule(PracticalScheduleDto practicalScheduleDto)
        {
            PracticalSchedule schedule = await _repository.Get<PracticalSchedule>(practicalScheduleDto.Id);
            schedule.Title = practicalScheduleDto.Title;
            schedule.Description = practicalScheduleDto.Description;
            schedule.StartDate = practicalScheduleDto.StartDate;
            schedule.EndDate = practicalScheduleDto.EndDate;
            schedule.Room = practicalScheduleDto.Room;
            schedule.BackgroundColor = practicalScheduleDto.BackgroundColor;
            schedule.TextColor = practicalScheduleDto.TextColor;
            PracticalSchedule newSchedule = await _repository.Update(schedule);
            return _mapper.Map<PracticalScheduleDto>(newSchedule);
        }

        public async Task DeletePracticalSchedule(int id)
        {
            await _repository.Delete<PracticalSchedule, int>(id);
        }
    }
}