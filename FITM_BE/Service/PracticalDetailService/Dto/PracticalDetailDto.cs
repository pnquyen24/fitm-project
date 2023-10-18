using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;

namespace FITM_BE.Service.PracticalDetailService.Dtos
{
    [AutoMap(typeof(PracticalDetail), ReverseMap = true)]
    public class PracticalDetailDto
    {
        public int Id { get; set; }
        public int PracticalScheduleId { get; set; }
        public int MemberId { get; set; }
        public AttendanceStatus Attendance { get; set; }
    }
}