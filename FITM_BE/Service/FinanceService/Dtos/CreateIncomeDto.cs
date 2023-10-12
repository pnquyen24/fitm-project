using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.PracticalSchedulService.Dtos
{
    [AutoMap(typeof(Income), ReverseMap = true)]
    public class CreateIncomeDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long IncomeAmount { get; set; }
    }
}
