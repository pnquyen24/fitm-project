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
            IQueryable<PracticalScheduleDto> practicalScheduleDtos =
                _practicalScheduleService.ViewPracticalSchedules();
            return practicalScheduleDtos;
        }
    }
}
