using FITM_BE.Service.PracticalDetailService;
using FITM_BE.Service.PracticalDetailService.Dto;
using FITM_BE.Service.PracticalDetailService.Dtos;
using FITM_BE.Service.LoggerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [Authorize]
    public class PracticalDetailController : ApiBase
    {
        private readonly IPracticalDetailService _attendancePracticalService;
        private readonly ILoggerManager _logger;

        public PracticalDetailController(IPracticalDetailService attendancePracticalService, ILoggerManager logger)
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

        [HttpGet]
        public IEnumerable<ProductivityDto> ViewProductivity()
        {
            return _attendancePracticalService.ViewProductivity();
        }
    }
}