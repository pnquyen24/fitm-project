﻿using FITM_BE.Service.PerformanceScheduleService;
using FITM_BE.Service.PerformanceScheduleService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FITM_BE.Controllers
{
    public class PerformanceScheduleController : ApiBase
    {
        private readonly IPerformanceScheduleService _performanceScheduleService;

        public PerformanceScheduleController(IPerformanceScheduleService performanceScheduleService)
        {
            _performanceScheduleService = performanceScheduleService;
        }

        [HttpPost]
        [Authorize]
        public async Task Create(PerformanceCreateDTO pfmDTO)
        {
            await _performanceScheduleService.CreatePerformance(pfmDTO);
        }

        [HttpGet]
        [Authorize]
        public IQueryable<PerformanceDTO> ViewPerformance()
        {
            return _performanceScheduleService.ViewPerformance();
        }

        [HttpGet]
        [Authorize]
        public async Task<PerformanceDetail?> ViewPerformanceDetails(int pfmID)
        {
            return await _performanceScheduleService.ViewPerformanceDetail(pfmID);
        }

        [HttpPut]
        [Authorize]
        public async Task Update(PerformanceUpdateDTO pfmDTO)
        {
            await _performanceScheduleService.UpdatePerformance(pfmDTO);
        }

        [HttpDelete]
        [Authorize]
        public async Task Delete(int pfmID)
        {
            await _performanceScheduleService.DeletePerformance(pfmID);
        }

        [HttpPut]
        [Authorize]
        public async Task Join(int pfmID)
        {
            int.TryParse(User.FindFirstValue("UserID"), out int userID);

            await _performanceScheduleService.JoinPerformance(pfmID, userID);
        } 

        [HttpPut]
        [Authorize]
        public async Task CallOff(int pfmID)
        {
            await _performanceScheduleService.CallOffPerformance(pfmID);
        }
    }
}