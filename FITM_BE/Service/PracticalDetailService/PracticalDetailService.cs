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
        public PracticalDetailService(IRepository repository, IMapper mapper, IMemberService memberService) : base(repository, mapper)
        {
        }

        public IEnumerable<ViewAttendanceDto> ViewAttendanceList(int scheduleId)
        {
            return _repository.GetAll<PracticalDetail>()
                                    .Where(prtD => prtD.PracticalScheduleId == scheduleId)
                                    .Include(prtD => prtD.Member)
                                    .Select(prtD => new ViewAttendanceDto
                                    {
                                        Id = prtD.Id,
                                        PracticalScheduleId = prtD.PracticalScheduleId,
                                        MemberId = prtD.MemberId,
                                        StudentId = prtD.Member.StudentID,
                                        FullName = prtD.Member.FullName,
                                        Attendance = prtD.Attendance
                                    });
        }

        public async Task CreateAttendanceList(int scheduleId)
        {
            var memberList = _repository.GetAll<Member>()
                                        .Select(member => new CreateAttendanceDto
                                        {
                                            PracticalScheduleId = scheduleId,
                                            MemberId = member.Id
                                        });
            var attendanceList = memberList.Select(member => _mapper.Map<PracticalDetail>(member));

            await _repository.AddRange(attendanceList);
        }

        public async Task<IEnumerable<PracticalDetailDto>> UpdateAttendanceStatus(IEnumerable<UpdateAttendanceDto> attendanceListDto)
        {
            var updateDict = attendanceListDto.ToDictionary(dto => dto.Id, dto => dto.Attendance);
            var updateIds = updateDict.Keys.ToList();

            var attendanceToUpdate = _repository.GetAll<PracticalDetail>()
                                            .Where(prtD => updateIds.Contains(prtD.Id))
                                            .ToList();
            foreach (var row in attendanceToUpdate)
            {
                if (updateDict.TryGetValue(row.Id, out var attendance))
                {
                    row.Attendance = attendance;
                }
            }

            await _repository.UpdateRange(attendanceToUpdate);

            var resultToReturn = attendanceToUpdate.Select(row => _mapper.Map<PracticalDetailDto>(row));
            return resultToReturn;
        }
    }
}