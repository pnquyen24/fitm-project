using FITM_BE.Authorization.Utils;
using FITM_BE.Service.LoggerService;
using FITM_BE.Service.PracticalDetailService;
using FITM_BE.Service.PracticalDetailService.Dto;
using FITM_BE.Service.PracticalDetailService.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [Policy(nameof(PracticalDetailController))]
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
        public async Task<IActionResult> UpdateAttendanceStatus([FromBody] IEnumerable<UpdateAttendanceDto> attendanceListDto)
        {
            var updatedList = await _attendancePracticalService.UpdateAttendanceStatus(attendanceListDto);
            return Ok(updatedList);
        }

        [HttpGet]
        public IEnumerable<ProductivityDto> ViewProductivity()
        {
            return _attendancePracticalService.ViewProductivity();
        }
    }
}