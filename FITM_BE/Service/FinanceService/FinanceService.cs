using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;
using FITM_BE.Service.FinanceService.Dtos;
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
                .Where(ic => ic.CreatedTime >= start && ic.CreatedTime <= end && ic.FinanceStatus == FinanceStatus.Accepted)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime, new DateComparer())
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
                .Where(ic => ic.CreatedTime >= start && ic.CreatedTime <= end && ic.FinanceStatus == FinanceStatus.Accepted)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime, new DateComparer())
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
