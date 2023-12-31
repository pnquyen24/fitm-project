﻿
using FITM_BE.Service.PracticalDetailService.Dto;
using FITM_BE.Service.PracticalDetailService.Dtos;

namespace FITM_BE.Service.PracticalDetailService
{
    public interface IPracticalDetailService
    {
        public IEnumerable<ViewAttendanceDto> ViewAttendanceList(int scheduleId);
        public Task CreateAttendanceList(int scheduleId);
        public Task<IEnumerable<PracticalDetailDto>> UpdateAttendanceStatus(IEnumerable<UpdateAttendanceDto> attendanceListDto);
        public IEnumerable<ProductivityDto> ViewProductivity();
    }
}