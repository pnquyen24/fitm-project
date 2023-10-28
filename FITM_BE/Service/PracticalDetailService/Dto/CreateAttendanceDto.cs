using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.PracticalDetailService.Dto
{
    [AutoMap(typeof(PracticalDetail), ReverseMap = true)]
    public class CreateAttendanceDto
    {
        public int PracticalScheduleId { get; set; }
        public int MemberId { get; set; }
    }
}
