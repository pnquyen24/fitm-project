using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.PracticalDetailService.Dto
{
    [AutoMap(typeof(PracticalDetail), ReverseMap = true)]
    public class ProductivityDto
    {
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public int TotalPresentPractices { get; set; }
        public int TotalPractices { get; set; }
    }
}
