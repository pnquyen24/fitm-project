using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.PracticalDetailService.Dto;
using FITM_BE.Service.PracticalDetailService.Dtos;
using FITM_BE.Service.MemberService;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;

namespace FITM_BE.Service.PracticalDetailService
{
    public class PracticalDetailService : ServiceBase, IPracticalDetailService
    {
        private readonly IMemberService _memberService;

        public PracticalDetailService(IRepository repository, IMapper mapper, IMemberService memberService) : base(repository, mapper)
        {
            _memberService = memberService;
        }

        public IEnumerable<ViewAttendanceDto> ViewAttendanceList(int scheduleId)
        {
            var attendancePracticalDtos = _repository
                .GetAll<PracticalDetail>()
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

        public async Task<IEnumerable<PracticalDetailDto>> CreateAttendanceList(int scheduleId)
        {
            var members = _memberService.GetMembersForAttendance();
            var attendanceDtos = members.Select(m => new CreateAttendanceDto
            {
                PracticalScheduleId = scheduleId,
                MemberId = m.Id
            });

            var attendanceList = attendanceDtos.Select(m => _mapper.Map<PracticalDetail>(m));
            var newList = await _repository.AddRange(attendanceList);

            var resultToReturn = newList.Select(m => _mapper.Map<PracticalDetailDto>(m));

            return resultToReturn;
        }

        public async Task<IEnumerable<PracticalDetailDto>> UpdateAttendanceList(IEnumerable<UpdateAttendanceDto> attendanceListDto)
        {
            var ids = attendanceListDto.Select(m => m.Id);
            var attendanceList = _repository
                .GetAll<PracticalDetail>()
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
            var resultToReturn = updatedList.Select(m => _mapper.Map<PracticalDetailDto>(m));

            return resultToReturn;
        }

        public IEnumerable<ProductivityDto> ViewProductivity()
        {
            var list = _repository.GetAll<PracticalDetail>()
                    .Include(prtD => prtD.Member)
                    .Include(prtD => prtD.PracticalSchedule)
                    .GroupBy(prtD => prtD.Member)
                    .Select(prtD => new ProductivityDto
                    {
                        StudentId = prtD.Key.StudentID,
                        FullName = prtD.Key.FullName,
                        TotalPresentPractices = prtD.Where(p => p.Attendance == Enums.AttendanceStatus.Present).Count(),
                        TotalPractices = prtD.Count()
                    });
            return list;
        }
    }
}