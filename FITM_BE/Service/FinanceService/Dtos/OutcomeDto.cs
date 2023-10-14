using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;

namespace FITM_BE.Service.FinanceService.Dtos
{
    [AutoMap(typeof(OutcomeDto), ReverseMap = true)]
    public class OutcomeDto
    {
        public long TotalAmount { get; set; }
        public long Balance { get; set; }
        public FinanceStatus FinanceStatus { get; set; }
        public DateTime? ModifiedTime { get; set; }
    }
}
