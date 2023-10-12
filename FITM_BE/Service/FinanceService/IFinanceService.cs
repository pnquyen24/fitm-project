using FITM_BE.Service.FinanceService.Dtos;

namespace FITM_BE.Service.FinanceService
{
    public interface IFinanceService
    {
        public IEnumerable<IncomeDto> GetAcceptedIncomeByTime(DateTime start, DateTime end);

        public IEnumerable<OutcomeDto> GetAcceptedOutcomeByTime(DateTime start, DateTime end);
    }
}
