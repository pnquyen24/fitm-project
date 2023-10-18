using FITM_BE.Service.AttendancePracticalService;
using FITM_BE.Service.AttendancePracticalService.Dto;
using FITM_BE.Service.AttendancePracticalService.Dtos;
using FITM_BE.Service.LoggerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [Authorize]
    public class AttendancePracticalController : ApiBase
    {
        private readonly IAttendancePracticalService _attendancePracticalService;
        private readonly ILoggerManager _logger;

        public AttendancePracticalController(IAttendancePracticalService attendancePracticalService, ILoggerManager logger)
        {
            _attendancePracticalService = attendancePracticalService;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ViewAttendanceDto> ViewAttendanceList(int scheduleId)
        {
            return _attendancePracticalService.ViewAttendanceList(scheduleId);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAttendanceList([FromBody] IEnumerable<UpdateAttendanceDto> attendanceListDto)
        {
            var updatedList = await _attendancePracticalService.UpdateAttendanceList(attendanceListDto);
            return Ok(updatedList);
        }
    }
}