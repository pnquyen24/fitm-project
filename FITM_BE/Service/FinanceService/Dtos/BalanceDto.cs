namespace FITM_BE.Service.FinanceService.Dtos
{
    public class BalanceDto
    {
        public string Title { get; set; }
        public string Description { get; set; } 
        public DateTime ModifiedTime { get; set; }
        public long TotalIncome { get; set; }
        public long TotalOutcome {  get; set; }
        public long Balance { get; set; }
    }
}
