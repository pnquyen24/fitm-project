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

        public async Task AddPracticalSchedule(PracticalScheduleDto practicalScheduleDto)
        {
            PracticalSchedule newSchedule = _mapper.Map<PracticalSchedule>(practicalScheduleDto);
            await _repository.Add(newSchedule);
        }

        public async Task UpdatePracticalSchedule(PracticalScheduleDto practicalScheduleDto)
        {
            PracticalSchedule schedule = await _repository.Get<PracticalSchedule>(practicalScheduleDto.Id);
            schedule = _mapper.Map<PracticalSchedule>(schedule);
            await _repository.Update(schedule);
        }

        public async Task DeletePracticalSchedule(int id)
        {
            await _repository.Delete<PracticalSchedule>(id);
        }
    }
}
