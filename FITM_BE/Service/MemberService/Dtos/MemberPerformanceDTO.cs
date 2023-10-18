using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.MemberService.Dtos
{
    [AutoMap(typeof(Member), ReverseMap = true)]
    public class MemberPerformanceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
