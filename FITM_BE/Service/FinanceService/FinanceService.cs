using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;
using FITM_BE.Service.FinanceService.Dtos;
using FITM_BE.Service.PracticalSchedulService.Dtos;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

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
                .Where(ic =>ic.ModifiedTime.Value.Date >= start.Date && ic.ModifiedTime.Value.Date <= end.Date && ic.FinanceStatus == FinanceStatus.Accepted)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime.Value.Date, new DateComparer())
                .Select(group => new
                {
                    ModifiedTime = group.Key,
                    TotalAmount = group.Sum(ic => ic.Amount),
                }).OrderBy(ic => ic.ModifiedTime);

            var groupedIncomes = from item in query
                                 select new IncomeDto
                                 {
                                     ModifiedTime = (DateTime)item.ModifiedTime,
                                     FinanceStatus = FinanceStatus.Accepted,
                                     TotalAmount = item.TotalAmount,
                                     Balance = item.TotalAmount
                                 };

            return groupedIncomes;
        }


        public IEnumerable<OutcomeDto> GetAcceptedOutcomeByTime(DateTime start, DateTime end)
        {
            var query = _repository.GetAll<Outcome>()
                .Where(oc => oc.ModifiedTime.Value.Date >= start.Date && oc.ModifiedTime.Value.Date <= end.Date && oc.FinanceStatus == FinanceStatus.Accepted)
                .AsEnumerable()
                .GroupBy(oc => oc.ModifiedTime.Value.Date, new DateComparer())
                .Select(group => new
                {
                    ModifiedTime = group.Key,
                    TotalAmount = group.Sum(oc => oc.Amount)
                }).OrderBy(oc => oc.ModifiedTime);

            var groupedIncomes = from item in query
                                 select new OutcomeDto
                                 {
                                     ModifiedTime = (DateTime)item.ModifiedTime,
                                     FinanceStatus = FinanceStatus.Accepted,
                                     TotalAmount = item.TotalAmount,
                                     Balance = (item.TotalAmount)
                                 };

            return groupedIncomes;
        }

        public IEnumerable<BalanceDto> CalculateBalanceByDate(DateTime start, DateTime end)
        {
            var combinedData = _repository.GetAll<Income>()
           .Where(ic => ic.ModifiedTime.Value.Date >= start.Date && ic.ModifiedTime.Value.Date <= end.Date && ic.FinanceStatus == FinanceStatus.Accepted)
           .Select(ic => new
           {
               ModifiedTime = ic.ModifiedTime,
               TotalAmount = ic.Amount,
               IsIncome = true
           })
           .Union(_repository.GetAll<Outcome>()
               .Where(oc => oc.ModifiedTime.Value.Date >= start.Date && oc.ModifiedTime.Value.Date <= end.Date && oc.FinanceStatus == FinanceStatus.Accepted)
               .Select(oc => new
               {
                   ModifiedTime = oc.ModifiedTime,
                   TotalAmount = oc.Amount,
                   IsIncome = false
               })).ToList();

            var groupedData = combinedData
                .GroupBy(item => item.ModifiedTime.Value.Date)
                .OrderBy(group => group.Key);

            long currentBalance = CalculateBalanceByBefore(new DateTime(2023,10,1),start);
            List<BalanceDto> balances = new List<BalanceDto>();

            for (var date = start.Date; date <= end.Date; date = date.AddDays(1))
            {
                var group = groupedData.FirstOrDefault(g => g.Key == date);
                var incomeTotal = group?.Where(item => item.IsIncome).Sum(item => item.TotalAmount) ?? 0;
                var outcomeTotal = group?.Where(item => !item.IsIncome).Sum(item => item.TotalAmount) ?? 0;

                currentBalance += incomeTotal - outcomeTotal;

                balances.Add(new BalanceDto
                {
                    ModifiedTime = date,
                    TotalIncome = incomeTotal,
                    TotalOutcome = outcomeTotal,
                    Balance = currentBalance
                });
            }

            return balances;
        }
        private long CalculateBalanceByBefore(DateTime start, DateTime end)
        {
            var combinedData = _repository.GetAll<Income>()
           .Where(ic => ic.ModifiedTime.Value.Date >= start.Date && ic.ModifiedTime.Value.Date <= end.Date && ic.FinanceStatus == FinanceStatus.Accepted)
           .Select(ic => new
           {
               ModifiedTime = ic.ModifiedTime,
               TotalAmount = ic.Amount,
               IsIncome = true
           })
           .Union(_repository.GetAll<Outcome>()
               .Where(oc => oc.ModifiedTime.Value.Date >= start.Date && oc.ModifiedTime.Value.Date <= end.Date && oc.FinanceStatus == FinanceStatus.Accepted)
               .Select(oc => new
               {
                   ModifiedTime = oc.ModifiedTime,
                   TotalAmount = oc.Amount,
                   IsIncome = false
               })).ToList();

            var groupedData = combinedData
                .GroupBy(item => item.ModifiedTime.Value.Date)
                .OrderBy(group => group.Key);

            long currentBalance = 0;
            List<BalanceDto> balances = new List<BalanceDto>();

            for (var date = start.Date; date < end.Date; date = date.AddDays(1))
            {
                var group = groupedData.FirstOrDefault(g => g.Key == date);
                var incomeTotal = group?.Where(item => item.IsIncome).Sum(item => item.TotalAmount) ?? 0;
                var outcomeTotal = group?.Where(item => !item.IsIncome).Sum(item => item.TotalAmount) ?? 0;

                currentBalance += incomeTotal - outcomeTotal;

                balances.Add(new BalanceDto
                {
                    ModifiedTime = date,
                    TotalIncome = incomeTotal,
                    TotalOutcome = outcomeTotal,
                    Balance = currentBalance
                });
            }

            return currentBalance;
        }

        public IEnumerable<BalanceDto> CalculateBalanceByDate1(DateTime start, DateTime end)
        {
            var outcome = _repository.GetAll<Outcome>()
                .Where(ic => ic.ModifiedTime >= start && ic.ModifiedTime <= end && ic.FinanceStatus == FinanceStatus.Accepted)
                .Select(ic => new { Outcome = ic, Time = ic.ModifiedTime.Value.Date })
                .GroupBy(ic => ic.Time)
                .Select(ic => new { ModifiedTime = ic.Key.Date, Amount = ic.Sum(ic => ic.Outcome.Amount) });
            var income = _repository.GetAll<Income>()
                .Where(ic => ic.ModifiedTime >= start && ic.ModifiedTime <= end && ic.FinanceStatus == FinanceStatus.Accepted)
                .Select(ic => new { Income = ic, Time = ic.ModifiedTime.Value.Date })
                .GroupBy(ic => ic.Time)
                .Select(ic => new { ModifiedTime = ic.Key.Date, Amount = ic.Sum(ic => ic.Income.Amount) });

            var combinedData = (from o in outcome
                                join i in income
                                on o.ModifiedTime equals i.ModifiedTime into iGroup
                                from i in iGroup.DefaultIfEmpty()
                                select new BalanceDto
                                {
                                    ModifiedTime = o.ModifiedTime,
                                    TotalIncome = i != null ? i.Amount : 0,
                                    TotalOutcome = o.Amount,
                                }).AsEnumerable();


            long currentBalance = 0;
            List<BalanceDto> balances = new List<BalanceDto>();

            for (var date = start.Date; date <= end.Date; date = date.AddDays(1))
            {
                var incomeTotal = combinedData.FirstOrDefault(item => item.ModifiedTime == date)?.TotalIncome ?? 0;
                var outcomeTotal = combinedData.FirstOrDefault(item => item.ModifiedTime == date)?.TotalOutcome ?? 0;

                currentBalance += incomeTotal - outcomeTotal;

                balances.Add(new BalanceDto
                {
                    ModifiedTime = date,
                    TotalIncome = incomeTotal,
                    TotalOutcome = outcomeTotal,
                    Balance = currentBalance
                });
            }

            return balances;
        }
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

