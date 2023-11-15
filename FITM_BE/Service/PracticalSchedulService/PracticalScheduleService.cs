using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.PracticalDetailService;
using FITM_BE.Service.PracticalSchedulService.Dtos;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;

namespace FITM_BE.Service.PracticalSchedulService
{
    public class PracticalScheduleService : ServiceBase, IPracticalScheduleService
    {
        private readonly IPracticalDetailService _attendancePracticalService;
        private static DateOnly currentDate = DateOnly.FromDateTime(DateTime.Today);

        public PracticalScheduleService(IRepository repository, IMapper mapper, IPracticalDetailService attendancePracticalService) : base(repository, mapper)
        {
            _attendancePracticalService = attendancePracticalService;
        }

        public IQueryable<PracticalScheduleDto> ViewPracticalSchedules()
        {
            IQueryable<PracticalScheduleDto> practicalScheduleDtos =
                _repository.GetAll<PracticalSchedule>().Select(schedule => _mapper.Map<PracticalScheduleDto>(schedule));
            return practicalScheduleDtos;
        }

        public Task<PracticalScheduleDto> GetPracticalSchedule(int id)
        {
            PracticalSchedule schedule = _repository.Get<PracticalSchedule>(id);
            return Task.FromResult(_mapper.Map<PracticalScheduleDto>(schedule));
        }

        public async Task<PracticalScheduleDto> AddPracticalSchedule(CreatePracticalScheduleDto practicalScheduleDto)
        {
            if (practicalScheduleDto.Date < currentDate)
            {
                throw new ArgumentException("Date cannot be in the past");
            }
            else
            {
                PracticalSchedule newSchedule = _mapper.Map<PracticalSchedule>(practicalScheduleDto);
                newSchedule = await _repository.Add(newSchedule);

                await _attendancePracticalService.CreateAttendanceList(newSchedule.Id);

                return _mapper.Map<PracticalScheduleDto>(newSchedule);
            }
        }

        public async Task<PracticalScheduleDto> UpdatePracticalSchedule(PracticalScheduleDto practicalScheduleDto)
        {
            if (practicalScheduleDto.Date < currentDate)
            {
                throw new ArgumentException("Date cannot be in the past");
            }
            else
            {
                PracticalSchedule schedule = _repository.Get<PracticalSchedule>(practicalScheduleDto.Id);
                schedule.Title = practicalScheduleDto.Title;
                schedule.Description = practicalScheduleDto.Description;
                schedule.Date = practicalScheduleDto.Date;
                schedule.StartTime = practicalScheduleDto.StartTime;
                schedule.EndTime = practicalScheduleDto.EndTime;
                schedule.Room = practicalScheduleDto.Room;
                PracticalSchedule newSchedule = await _repository.Update(schedule);
                return _mapper.Map<PracticalScheduleDto>(newSchedule);
            }
        }

        public async Task DeletePracticalSchedule(int id)
        {
            var practicalSchedule = _repository.GetAll<PracticalSchedule>()
                                                .Where(p => p.Id == id)
                                                .FirstOrDefault() ?? throw new NotFoundException($"{nameof(PracticalSchedule)} not found");
            if (practicalSchedule.Date < currentDate)
            {
                throw new ArgumentException("Cannot delete in the past");
            }
            else
            {
                await _repository.Delete<PracticalSchedule, int>(id);
            }
        }
    }
}