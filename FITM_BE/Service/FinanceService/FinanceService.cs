using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;
using FITM_BE.Service.FinanceService.Dtos;
using FITM_BE.Service.PracticalSchedulService.Dtos;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Service.FinanceService
{
    public class FinanceService : ServiceBase, IFinanceService
    {
        public FinanceService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public IEnumerable<IncomeDto> GetAcceptedIncomeByTime(DateTime start, DateTime end)
        {
            var query = _repository.GetAll<Income>()
                .Where(ic => ic.ModifiedTime >= start && ic.ModifiedTime <= end && ic.FinanceStatus == FinanceStatus.Accepted)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime.Value.Date, new DateComparer())
                .Select(group => new
                {
                    ModifiedTime = group.Key,
                    TotalAmount = group.Sum(ic => ic.Amount)
                });

            var groupedIncomes = from item in query
                                 select new IncomeDto
                                 {
                                     ModifiedTime = (DateTime)item.ModifiedTime,
                                     FinanceStatus = FinanceStatus.Accepted,
                                     TotalAmount = item.TotalAmount
                                 };

            return groupedIncomes;
        }


        public IEnumerable<OutcomeDto> GetAcceptedOutcomeByTime(DateTime start, DateTime end)
        {
            var query = _repository.GetAll<Outcome>()
                .Where(ic => ic.ModifiedTime >= start && ic.ModifiedTime <= end && ic.FinanceStatus == FinanceStatus.Accepted)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime.Value.Date, new DateComparer())
                .Select(group => new
                {
                    ModifiedTime = group.Key,
                    TotalAmount = group.Sum(ic => ic.Amount)
                });

            var groupedIncomes = from item in query
                                 select new OutcomeDto
                                 {
                                     ModifiedTime = (DateTime)item.ModifiedTime,
                                     FinanceStatus = FinanceStatus.Accepted,
                                     TotalAmount = item.TotalAmount
                                 };

            return groupedIncomes;
        }

        //==================================================

        public IQueryable<IncomeListDto> ViewIncome()
        {
            IQueryable<IncomeListDto> incomeListDtos =
                _repository.GetAll<Income>().Select(income => _mapper.Map<IncomeListDto>(income));
            return incomeListDtos;
        }

        public async Task<IncomeListDto> GetIncome(int id)
        {
            Income income = await _repository.Get<Income>(id);
            return _mapper.Map<IncomeListDto>(income);
        }

        public async Task<IncomeListDto> AddIncome(CreateIncomeDto createIncomeDto)
        {
            Income newIncome = _mapper.Map<Income>(createIncomeDto);
            newIncome = await _repository.Add(newIncome);
            return _mapper.Map<IncomeListDto>(newIncome);
        }

        public async Task<IncomeListDto> UpdateIncome(IncomeListDto incomeListDto)
        {
            Income income = await _repository.Get<Income>(incomeListDto.Id);
            income.Title = incomeListDto.Title;
            income.Description = incomeListDto.Description;
            income.Amount = incomeListDto.Amount;
            income.FinanceStatus = incomeListDto.FinanceStatus;
            Income newIncome = await _repository.Update(income);
            return _mapper.Map<IncomeListDto>(newIncome);
        }

        public async Task DeleteIncome(int id)
        {
            await _repository.Delete<Income, int>(id);
        }

        //==================================================
        public IQueryable<OutcomeListDto> ViewOutcome()
        {
            IQueryable<OutcomeListDto> outcomeListDtos =
                _repository.GetAll<Outcome>().Select(outcome => _mapper.Map<OutcomeListDto>(outcome));
            return outcomeListDtos;
        }

        public async Task<OutcomeListDto> GetOutcome(int id)
        {
            Outcome outcome = await _repository.Get<Outcome>(id);
            return _mapper.Map<OutcomeListDto>(outcome);
        }

        public async Task<OutcomeListDto> AddOutcome(CreateOutcomeDto createOutcomeDto)
        {
            Outcome newOutcome = _mapper.Map<Outcome>(createOutcomeDto);
            newOutcome = await _repository.Add(newOutcome);
            return _mapper.Map<OutcomeListDto>(newOutcome);
        }

        public async Task<OutcomeListDto> UpdateOutcome(OutcomeListDto outcomeListDto)
        {
            Outcome outcome = await _repository.Get<Outcome>(outcomeListDto.Id);
            outcome.Title = outcomeListDto.Title;
            outcome.Description = outcomeListDto.Description;
            outcome.Amount = outcomeListDto.Amount;
            outcome.FinanceStatus = outcomeListDto.FinanceStatus;
            Outcome newOutcome = await _repository.Update(outcome);
            return _mapper.Map<OutcomeListDto>(newOutcome);
        }

        public async Task DeleteOutcome(int id)
        {
            await _repository.Delete<Outcome, int>(id);
        }

    }

    class DateComparer : IEqualityComparer<DateTime?>
    {
        public bool Equals(DateTime? x, DateTime? y)
        {
            if (!x.HasValue || !y.HasValue)
                return false;
            return x.Value.Date.Equals(y.Value.Date);
        }

        public int GetHashCode([DisallowNull] DateTime? obj)
        {
            return obj.GetHashCode();
        }
    }
}
