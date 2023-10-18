﻿using FITM_BE.Entity;
using FITM_BE.Service.PerformanceScheduleService.Dtos;

namespace FITM_BE.Service.PerformanceScheduleService
{
    public interface IPerformanceScheduleService
    {
        Task CreatePerformance(PerformanceCreateDTO pfmDTO);
        Task<PerformanceDetail?> ViewPerformanceDetail(int pfmID);
        IQueryable<PerformanceDTO> ViewPerformance();
        Task UpdatePerformance(PerformanceUpdateDTO pfmDTO);
        Task DeletePerformance(int pfmID);
        Task JoinPerformance(int pfmID, int MemberID);
        Task CallOffPerformance(int pfmID);
    }
}