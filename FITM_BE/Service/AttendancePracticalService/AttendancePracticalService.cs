using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.AttendancePracticalService.Dto;
using FITM_BE.Service.AttendancePracticalService.Dtos;
using FITM_BE.Service.MemberService;
using FITM_BE.Util;

namespace FITM_BE.Service.AttendancePracticalService
{
    public class AttendancePracticalService : ServiceBase, IAttendancePracticalService
    {
        private readonly IMemberService _memberService;

        public AttendancePracticalService(IRepository repository, IMapper mapper, IMemberService memberService) : base(repository, mapper)
        {
            _memberService = memberService;
        }

        public IEnumerable<ViewAttendanceDto> ViewAttendanceList(int scheduleId)
        {
            var attendancePracticalDtos = _repository
                .GetAll<AttendancePractical>()
                .Where(m => m.PracticalScheduleId == scheduleId)
                .Select(m => _mapper.Map<ViewAttendanceDto>(m))
                .ToList();

            var members = _memberService.GetMembersForAttendance().ToList();

            foreach (var attendance in attendancePracticalDtos)
            {
                var member = members.FirstOrDefault(m => m.Id == attendance.MemberId);

                if (member != null)
                {
                    attendance.StudentId = member.StudentID;
                    attendance.FullName = member.FullName;
                }
            }
            return attendancePracticalDtos;
        }

        public async Task<IEnumerable<AttendancePracticalDto>> CreateAttendanceList(int scheduleId)
        {
            var members = _memberService.GetMembersForAttendance();
            var attendanceDtos = members.Select(m => new CreateAttendanceDto
            {
                PracticalScheduleId = scheduleId,
                MemberId = m.Id
            });

            var attendanceList = attendanceDtos.Select(m => _mapper.Map<AttendancePractical>(m));
            var newList = await _repository.AddRange(attendanceList);

            var resultToReturn = newList.Select(m => _mapper.Map<AttendancePracticalDto>(m));

            return resultToReturn;
        }

        public async Task<IEnumerable<AttendancePracticalDto>> UpdateAttendanceList(IEnumerable<UpdateAttendanceDto> attendanceListDto)
        {
            var ids = attendanceListDto.Select(m => m.Id);
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
            var resultToReturn = updatedList.Select(m => _mapper.Map<AttendancePracticalDto>(m));
            
            return resultToReturn;
        }
    }
}