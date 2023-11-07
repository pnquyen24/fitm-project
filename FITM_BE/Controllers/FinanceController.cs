using FITM_BE.Authorization.Utils;
using FITM_BE.Service.FinanceService;
using FITM_BE.Service.FinanceService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [Policy(nameof(FinanceController))]
    public class FinanceController : ApiBase
    {
        private readonly IFinanceService _financeService;

        public FinanceController(IFinanceService financeService)
        {
            _financeService = financeService;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<IncomeDto> GetAcceptedIncomeByTime(DateTime startDate, DateTime endDate)
        {
            return _financeService.GetAcceptedIncomeByTime(startDate, endDate);
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<OutcomeDto> getAcceptedOutcomeByTime(DateTime startDate, DateTime endDate)
        {
            return _financeService.GetAcceptedOutcomeByTime(startDate, endDate);
        }
        [HttpGet]
        [Authorize]
        public IEnumerable<BalanceDto> GetBalanceByDate(DateTime startDate, DateTime endDate)
        {
            return _financeService.CalculateBalanceByDate(startDate, endDate);
        }
        [HttpGet]
        public IQueryable<IncomeListDto> ViewIncome()
        {
            return _financeService.ViewIncome();
        }

        [HttpGet]
        public async Task<IActionResult> GetIncome(int id)
        {
            IncomeListDto income = await _financeService.GetIncome(id);
            return Ok(income);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddIncome([FromBody] CreateIncomeDto income)
        {
            IncomeListDto newIncome = await _financeService.AddIncome(income);
            return Ok(newIncome);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateIncome([FromBody] IncomeListDto income)
        {
            var updateIncome = await _financeService.UpdateIncome(income);
            return Ok(updateIncome);
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            await _financeService.DeleteIncome(id);
            return Ok();
        }

        //=======================================================

        [HttpGet]
        public IQueryable<OutcomeListDto> ViewOutcome()
        {
            return _financeService.ViewOutcome();
        }

        [HttpGet]
        public async Task<IActionResult> GetOutcome(int id)
        {
            OutcomeListDto outcome = await _financeService.GetOutcome(id);
            return Ok(outcome);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddOutcome([FromBody] CreateOutcomeDto outcome)
        {
            OutcomeListDto newOutcome = await _financeService.AddOutcome(outcome);
            return Ok(newOutcome);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateOutcome([FromBody] OutcomeListDto outcome)
        {
            var updateOutcome = await _financeService.UpdateOutcome(outcome);
            return Ok(updateOutcome);
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteOutcome(int id)
        {
            await _financeService.DeleteOutcome(id);
            return Ok();
        }

        [HttpPost]
        [Authorize]
        public Task<IncomeListDto> ChangeIncomeStatus(int id)
        {
            var incomeStatus = _financeService.ChangeIncomeStatus(id);

            return incomeStatus;
        }

        [HttpPost]
        [Authorize]
        public Task<OutcomeListDto> ChangeOutcomeStatus(int id)
        {
            var outcomeStatus = _financeService.ChangeOutcomeStatus(id);

            return outcomeStatus;
        }

        //=========================================
        [HttpPost]
        [Authorize]
        public Task<CreateIncomeDto> DenyIncomeRequest(int id)
        {
            var denyIncome = _financeService.DenyIncomeRequest(id);
            return denyIncome;
        }

        [HttpPost]
        [Authorize]
        public Task<CreateIncomeDto> AcceptIncomeRequest(int id)
        {
            var acceptIncome = _financeService.AcceptIncomeRequest(id);
            return acceptIncome;
        }


        //=========================================
        [HttpPost]
        public Task<CreateOutcomeDto> DenyOutcomeRequest(int id)
        {
            var denyOutcome = _financeService.DenyOutcomeRequest(id);
            return denyOutcome;
        }

        [HttpPost]
        public Task<CreateOutcomeDto> AcceptOutcomeRequest(int id)
        {
            var acceptOutcome = _financeService.AcceptOutcomeRequest(id);
            return acceptOutcome;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<FinanceDto> GetFinanceReport()
        {
            var acceptOutcome = _financeService.GetFinanceReport();
            return acceptOutcome;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<FinanceDto> GetBalanceDetails(DateTime start, DateTime end)
        {
            var balanceDetails = _financeService.GetBalanceDetail(start, end);
            return balanceDetails;
        }

        //==================================== 
    }
}
