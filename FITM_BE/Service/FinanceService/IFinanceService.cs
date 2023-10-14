using FITM_BE.Service.FinanceService.Dtos;
using FITM_BE.Entity;


namespace FITM_BE.Service.FinanceService
{
    public interface IFinanceService
    {
        public IEnumerable<IncomeDto> GetAcceptedIncomeByTime(DateTime start, DateTime end);
        public IEnumerable<OutcomeDto> GetAcceptedOutcomeByTime(DateTime start, DateTime end);

        public IEnumerable<BalanceDto> CalculateBalanceByDate(DateTime start, DateTime end);
        public IQueryable<IncomeListDto> ViewIncome();
        public Task<IncomeListDto> GetIncome(int id);
        public Task<IncomeListDto> AddIncome(CreateIncomeDto incomeDto);
        public Task<IncomeListDto> UpdateIncome(IncomeListDto incomeDto);
        public Task DeleteIncome(int id);
        public IQueryable<OutcomeListDto> ViewOutcome();
        public Task<OutcomeListDto> GetOutcome(int id);
        public Task<OutcomeListDto> AddOutcome(CreateOutcomeDto outcomeDto);
        public Task<OutcomeListDto> UpdateOutcome(OutcomeListDto outcomeDto);
        public Task DeleteOutcome(int id);
        public Task<IncomeDto> ChangeIncomeStatus(int id);

    }
}
