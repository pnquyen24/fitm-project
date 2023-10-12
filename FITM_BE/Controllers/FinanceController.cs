using FITM_BE.Service.FinanceService;
using FITM_BE.Service.FinanceService.Dtos;
using FITM_BE.Util.Pagging;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    public class FinanceController : ApiBase
    {
        private readonly IFinanceService _financeService;

        public FinanceController(IFinanceService financeService)
        {
            _financeService = financeService;
        }

        [HttpPost]
        public IEnumerable<IncomeDto> GetAcceptedIncomeByTime(DateTime startDate, DateTime endDate)
        {
            return _financeService.GetAcceptedIncomeByTime(startDate, endDate);
        }

        [HttpPost]
        public IEnumerable<OutcomeDto> getAcceptedOutcomeByTime(DateTime startDate, DateTime endDate)
        {
            return _financeService.GetAcceptedOutcomeByTime(startDate, endDate);
        }
    }
}
