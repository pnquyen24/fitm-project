namespace FITM_BE.Service.FinanceService.Dtos
{
    public class FinanceDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTime { get; set; }
        public long Amount { get; set; }    
    }
}
