using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.FinanceService.Dtos
{
    [AutoMap(typeof(Income), ReverseMap = true)]
    public class CreateIncomeDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long Amount { get; set; }
        public string BillCode { get; set; }
    }
}
