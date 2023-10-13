using FITM_BE.Service.FinanceService;
using FITM_BE.Service.FinanceService.Dtos;
using FITM_BE.Service.PracticalSchedulService.Dtos;
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

        //=======================================================

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
        public async Task<IActionResult> AddIncome([FromBody] CreateIncomeDto income)
        {
            IncomeListDto newIncome = await _financeService.AddIncome(income);
            return Ok(newIncome);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateIncome([FromBody] IncomeListDto income)
        {
            var updateIncome = await _financeService.UpdateIncome(income);
            return Ok(updateIncome);
        }

        [HttpDelete]
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
        public async Task<IActionResult> AddOutcome([FromBody] CreateOutcomeDto outcome)
        {
            OutcomeListDto newOutcome = await _financeService.AddOutcome(outcome);
            return Ok(newOutcome);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateOutcome([FromBody] OutcomeListDto outcome)
        {
            var updateOutcome = await _financeService.UpdateOutcome(outcome);
            return Ok(updateOutcome);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteOutcome(int id)
        {
            await _financeService.DeleteOutcome(id);
            return Ok();
        }
    }
}
