using FITM_BE.Service.LoggerService;
using FITM_BE.Service.PracticalSchedulService;
using FITM_BE.Service.PracticalSchedulService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    //[Authorize]
    public class PracticalScheduleController : ApiBase
    {
        private readonly IPracticalScheduleService _practicalScheduleService;
        private readonly ILoggerManager _logger;

        public PracticalScheduleController(IPracticalScheduleService practicalScheduleService, ILoggerManager logger)
        {
            _practicalScheduleService = practicalScheduleService;
            _logger = logger;
        }

        [HttpGet]
        public IQueryable<PracticalScheduleDto> ViewPracticalSchedules()
        {
            return _practicalScheduleService.ViewPracticalSchedules();
        }

        [HttpGet]
        public async Task<IActionResult> GetPracticalSchedule(int id)
        {
            PracticalScheduleDto schedule = await _practicalScheduleService.GetPracticalSchedule(id);
            return Ok(schedule);
        }

        [HttpPost]
        public async Task<IActionResult> AddPracticalSchedule([FromBody] CreatePracticalScheduleDto schedule)
        {
            PracticalScheduleDto newSchedule = await _practicalScheduleService.AddPracticalSchedule(schedule);
            return CreatedAtAction(nameof(GetPracticalSchedule), new { id = newSchedule.Id }, newSchedule);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePracticalSchedule([FromBody] PracticalScheduleDto schedule)
        {
            var updateSchedule = await _practicalScheduleService.UpdatePracticalSchedule(schedule);
            return Ok(updateSchedule);
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePracticalSchedule(int id)
        {
            await _practicalScheduleService.DeletePracticalSchedule(id);
            return Ok();
        }
    }
}
