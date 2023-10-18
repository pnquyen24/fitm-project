using FITM_BE.Enums;

namespace FITM_BE.Service.FinanceService.Dtos
{
    public class FinanceDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public string BillCode { get; set; }
        public long Amount { get; set; }
        public FinanceStatus financeStatus { get; set; }
        public bool IsIncome { get; set; }  
    }
}
