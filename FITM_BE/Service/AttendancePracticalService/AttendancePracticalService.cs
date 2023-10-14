using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.AttendancePracticalService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.AttendancePracticalService
{
    public class AttendancePracticalService : ServiceBase, IAttendancePracticalService
    {
        public AttendancePracticalService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public IQueryable<AttendancePracticalDto> ViewAttendanceList()
        {
            IQueryable<AttendancePracticalDto> attendancePracticalDtos = 
                _repository.GetAll<AttendancePractical>().Select(member => _mapper.Map<AttendancePracticalDto>(member));
            return attendancePracticalDtos;
        }

        public async Task<AttendancePracticalDto> CreateAttendanceList(int scheduleId)
        {
            var listMembersDto = _repository
                .GetAll<Member>()
                .Select(member => new CreateAttendanceDto
                {
                    ScheduleId = scheduleId,
                    StudentId = member.StudentID,
                    FullName = member.FullName
                });
            AttendancePractical newList = _mapper.Map<AttendancePractical>(listMembersDto);
            newList = await _repository.Add(newList);
            return _mapper.Map<AttendancePracticalDto>(newList);
        }

        public async Task<List<AttendancePracticalDto>> UpdateAttendanceList(List<UpdateAttendanceDto> attendanceListDto)
        {
            var ids = attendanceListDto.Select(m => m.Id).ToList();
            var attendanceList = _repository
                .GetAll<AttendancePractical>()
                .Where(m => ids.Contains(m.Id))
                .ToList();

            foreach (var member in attendanceList)
            {
                var updateMember = attendanceListDto.FirstOrDefault(m => m.Id == member.Id);

                if (updateMember != null)
                {
                    member.Attendance = updateMember.Attendance;
                }
            }

            var updatedList = await _repository.UpdateRange(attendanceList);
            return _mapper.Map<List<AttendancePracticalDto>>(updatedList);
        }
    }
}
