using FITM_BE.Service.AttendancePracticalService.Dtos;

namespace FITM_BE.Service.AttendancePracticalService
{
    public interface IAttendancePracticalService
    {
        public IQueryable<AttendancePracticalDto> ViewAttendanceList();
        public Task<AttendancePracticalDto> CreateAttendanceList(int scheduleId);
        public Task<List<AttendancePracticalDto>> UpdateAttendanceList(List<UpdateAttendanceDto> attendanceListDto);
    }
}
