
using FITM_BE.Service.AttendancePracticalService.Dto;
using FITM_BE.Service.AttendancePracticalService.Dtos;

namespace FITM_BE.Service.AttendancePracticalService
{
    public interface IAttendancePracticalService
    {
        public IEnumerable<ViewAttendanceDto> ViewAttendanceList(int scheduleId);
        public Task<IEnumerable<AttendancePracticalDto>> CreateAttendanceList(int scheduleId);
        public Task<IEnumerable<AttendancePracticalDto>> UpdateAttendanceList(IEnumerable<UpdateAttendanceDto> attendanceListDto);
    }
}