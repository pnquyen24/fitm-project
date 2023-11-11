using FITM_BE.Authorization.Utils;
using FITM_BE.Service.PerformanceScheduleService;
using FITM_BE.Service.PerformanceScheduleService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FITM_BE.Controllers
{
    [Policy(nameof(PerformanceScheduleController))]
    public class PerformanceScheduleController : ApiBase
    {
        private readonly IPerformanceScheduleService _performanceScheduleService;

        public PerformanceScheduleController(IPerformanceScheduleService performanceScheduleService)
        {
            _performanceScheduleService = performanceScheduleService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(PerformanceCreateDTO pfmDTO)
        {
            await _performanceScheduleService.CreatePerformance(pfmDTO);
            return Ok(pfmDTO);
        }

        [HttpGet]
        [AllowAnonymous]
        [Policy]
        public IQueryable<PerformanceDTO> ViewPerformance()
        {
            return _performanceScheduleService.ViewPerformance();
        }
        
        [HttpGet]
        public IQueryable<PerformanceDTO> ViewAllPerformance()
        {
            return _performanceScheduleService.ViewAllPerformance();
        }

        [HttpGet]
        public async Task<PerformanceDetail?> ViewPerformanceDetails(int pfmID)
        {
            return await _performanceScheduleService.ViewPerformanceDetail(pfmID);
        }

        [HttpPut]
        public async Task<IActionResult> Update(PerformanceUpdateDTO pfmDTO)
        {
            await _performanceScheduleService.UpdatePerformance(pfmDTO);
	    return Ok(pfmDTO);
	}

        [HttpDelete]
        public async Task Delete(int pfmID)
        {
            await _performanceScheduleService.DeletePerformance(pfmID);
        }

        [HttpPut]
        public async Task Join(int pfmID)
        {
            int.TryParse(User.FindFirstValue("UserID"), out int userID);
            await _performanceScheduleService.JoinPerformance(pfmID, userID);
        } 

        [HttpPut]
        public async Task CallOff(int pfmID)
        {
            await _performanceScheduleService.CallOffPerformance(pfmID);
        }

        [HttpGet]
        public async Task<PerformanceViewAttendDTO?> ViewListMember(int pfmID)
        {
            return  await _performanceScheduleService.ViewListMembers(pfmID);
        }

        [HttpGet]
        public IQueryable<PerformanceCountDTO> CountPerformanceOfMember(int monthRange)
        {
            return  _performanceScheduleService.CountPerformanceOfMember(monthRange);
        }

        [HttpPut]
        public async Task AttendancePerformance(PerformanceAttendanceDTO pfmAttend)
        {
            await _performanceScheduleService.AttendancePerformance(pfmAttend);
        }
    }
}
