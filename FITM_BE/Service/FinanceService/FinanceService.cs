using AutoMapper;
using AutoMapper.Execution;
using FITM_BE.Authentication;
using FITM_BE.Entity;
using FITM_BE.Enums;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service;
using FITM_BE.Service.EmailService;
using FITM_BE.Service.FinanceService;
using FITM_BE.Service.FinanceService.Dtos;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Service.PracticalSchedulService.Dtos;
using FITM_BE.Service.RequestEditInforService.Dtos;
using FITM_BE.Util;
using FITM_BE.Util.Pagging;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Metrics;
using System.Linq;

namespace FITM_BE.Service.FinanceService
{
    public class FinanceService : ServiceBase, IFinanceService
    {
        private readonly IAccountService _accountService;
        private readonly IEmailSender _emailSender;
        public FinanceService(IRepository repository, IMapper mapper, IEmailSender emailSender, IAccountService accountService) : base(repository, mapper)
        {
            _accountService = accountService;
            _emailSender = emailSender;
        }

        public IEnumerable<IncomeDto> GetAcceptedIncomeByTime(DateTime start, DateTime end)
        {
            var query = _repository.GetAll<Income>()
                .Where(ic => ic.ModifiedTime.Value.Date >= start.Date)
                .Where(ic => ic.ModifiedTime.Value.Date <= end.Date)
                .Where(ic => ic.FinanceStatus == FinanceStatus.Accepted)
                .OrderBy(ic => ic.ModifiedTime)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime.Value.Date, new DateComparer())
                .Select(group => new
                {
                    ModifiedTime = group.Key,
                    TotalAmount = group.Sum(ic => ic.Amount),
                })
                .Select(item => new IncomeDto
                {
                    ModifiedTime = (DateTime)item.ModifiedTime,
                    FinanceStatus = FinanceStatus.Accepted,
                    TotalAmount = item.TotalAmount,
                    Balance = item.TotalAmount
                });

            return query;
        }


        public IEnumerable<OutcomeDto> GetAcceptedOutcomeByTime(DateTime start, DateTime end)
        {
            var query = _repository.GetAll<Outcome>()
                .Where(ic => ic.ModifiedTime.Value.Date >= start.Date)
                .Where(ic => ic.ModifiedTime.Value.Date <= end.Date)
                .Where(ic => ic.FinanceStatus == FinanceStatus.Accepted)
                .OrderBy(ic => ic.ModifiedTime)
                .AsEnumerable()
                .GroupBy(ic => ic.ModifiedTime.Value.Date, new DateComparer())
                .Select(group => new
                {
                    ModifiedTime = group.Key,
                    TotalAmount = group.Sum(ic => ic.Amount),
                })
                .Select(item => new OutcomeDto
                {
                    ModifiedTime = (DateTime)item.ModifiedTime,
                    FinanceStatus = FinanceStatus.Accepted,
                    TotalAmount = item.TotalAmount,
                    Balance = item.TotalAmount
                });

            return query;
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

            long currentBalance = CalculateBalanceByBefore(new DateTime(2023, 10, 1), start);
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
            .Where(ic => ic.ModifiedTime.Value.Date >= start.Date && ic.ModifiedTime.Value.Date < end.Date && ic.FinanceStatus == FinanceStatus.Accepted)
            .Select(ic => new
            {
                ModifiedTime = ic.ModifiedTime,
                TotalAmount = ic.Amount,
                IsIncome = true
            })
            .Union(_repository.GetAll<Outcome>()
                .Where(oc => oc.ModifiedTime.Value.Date >= start.Date && oc.ModifiedTime.Value.Date < end.Date && oc.FinanceStatus == FinanceStatus.Accepted)
                .Select(oc => new
                {
                    ModifiedTime = oc.ModifiedTime,
                    TotalAmount = oc.Amount,
                    IsIncome = false
                }));

            long balance = combinedData.Sum(data => data.IsIncome ? data.TotalAmount : -data.TotalAmount);

            return balance;
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
            income.BillCode = incomeListDto.BillCode;
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
            outcome.BillCode = outcomeListDto.BillCode;
            outcome.FinanceStatus = outcomeListDto.FinanceStatus;
            Outcome newOutcome = await _repository.Update(outcome);
            return _mapper.Map<OutcomeListDto>(newOutcome);
        }

        public async Task DeleteOutcome(int id)
        {
            await _repository.Delete<Outcome, int>(id);
        }

        //======================================
        public async Task<IncomeListDto> ChangeIncomeStatus(int id)
        {
            var income = await _repository.Get<Income>(id);
            var finance_manager = _repository.GetAll<FITM_BE.Entity.Member>()
                .Where(member => member.Roles.Any(role => role.RoleName == "Admin")).ToList();

            if (income == null)
            {
                // Handle the case when the income with the specified id is not found
                return null;
            }

            income.FinanceStatus = FinanceStatus.Pending;

            var updatedIncome = await _repository.Update(income);
            var incomeDto = _mapper.Map<IncomeDto>(updatedIncome);

            // Send income report email
            string title = income.Title.ToString();
            string description = income.Description.ToString();
            string amount = income.Amount.ToString();
            string status = incomeDto.FinanceStatus.ToString();

            foreach (var member in finance_manager)
            {
                await SendIncomeReport(member.Email, title, description, amount, status);
            }

            return _mapper.Map<IncomeListDto>(updatedIncome);
        }

        private async Task SendIncomeReport(string email, string title, string description, string amount, string status)
        {
            var message = new Message(
                new string[] { email },
                "Income Report",
                $"<p>REPORT:</p>" +
                $"<ul>" +
                $"<li>FM has send you a request:</li>" +
                $"<li>Income Information:</li>" +
                $"<li>Title: {title}</li>" +
                $"<li>Description: {description}</li>" +
                $"<li>Amount: {amount}</li>" +
                $"<li>Status: {status}</li>" +
                $"</ul>"
            );

            await _emailSender.SendEmailAsync(message);
        }
        //======================================
        public async Task<OutcomeListDto> ChangeOutcomeStatus(int id)
        {
            var outcome = await _repository.Get<Outcome>(id);
            var finance_manager = _repository.GetAll<FITM_BE.Entity.Member>()
                .Where(member => member.Roles.Any(role => role.RoleName == "Admin")).ToList();

            if (outcome == null)
            {
                return null;
            }

            outcome.FinanceStatus = FinanceStatus.Pending;

            var updatedOutcome = await _repository.Update(outcome);
            var outcomeDto = _mapper.Map<OutcomeDto>(updatedOutcome);

            string title = outcome.Title.ToString();
            string description = outcome.Description.ToString();
            string amount = outcome.Amount.ToString();
            string status = outcomeDto.FinanceStatus.ToString();

            foreach (var member in finance_manager)
            {
                await SendOutcomeReport(member.Email, title, description, amount, status);
            }

            return _mapper.Map<OutcomeListDto>(updatedOutcome);
        }

        private async Task SendOutcomeReport(string email, string title, string description, string amount, string status)
        {
            var message = new Message(
                new string[] { email },
                "Outcome Report",
                $"<p>REPORT:</p>" +
                $"<ul>" +
                $"<li>FM has send you a request:</li>" +
                $"<li>Outcome Information:</li>" +
                $"<li>Title: {title}</li>" +
                $"<li>Description: {description}</li>" +
                $"<li>Amount: {amount}</li>" +
                $"<li>Status: {status}</li>" +
                $"</ul>"
            );

            await _emailSender.SendEmailAsync(message);
        }

        //====================================================

        private async Task ReplyRequestMail(string email, int status)
        {
            Message message;

            if (status == 2)
            {
                message = new Message
                (
               new string[]
                    { email },
                    "FITM Chairboard reply: DENIED",
                    "From FITM Chairboard"
                    + "<p>Your request to change Finance Request has been denied</p>"
                );
            }
            else
            {
                message = new Message
                 (
                new string[]
                     { email },
                     "FITM Chairboard reply: ACCEPTED",
                    "From FITM Chairboard"
                    + "<p>Your request to change Finance Request has been accepted</p>"
                 );
            }
            await _emailSender.SendEmailAsync(message);
        }


        public async Task<CreateIncomeDto> DenyIncomeRequest(int requestId)
        {
            var requestEditIncome = _repository.GetAll<Income>().
                First(request => request.Id == requestId);

            var finance_manager = _repository.GetAll<FITM_BE.Entity.Member>()
                .Where(member => member.Roles.Any(role => role.RoleName == "Admin")).ToList();

            requestEditIncome.FinanceStatus = (Enums.FinanceStatus)3;
            await _repository.Update(requestEditIncome);

            foreach (var member in finance_manager)
            {
                await ReplyRequestMail(member.Email, 2);
            }

            var createRequestEditIncome = _mapper.Map<CreateIncomeDto>(requestEditIncome);

            return createRequestEditIncome;
        }

        public async Task<CreateIncomeDto> AcceptIncomeRequest(int requestId)
        {
            var requestEditIncome = await _repository.GetAll<Income>().
                FirstAsync(request => request.Id == requestId);

            var finance_manager = _repository.GetAll<FITM_BE.Entity.Member>()
               .Where(member => member.Roles.Any(role => role.RoleName == "FM")).ToList();

            requestEditIncome.FinanceStatus = (Enums.FinanceStatus)2;
            await _repository.Update(requestEditIncome);

            foreach (var member in finance_manager)
            {
                await ReplyRequestMail(member.Email, 1);
            }

            var createRequestEditIncome = _mapper.Map<CreateIncomeDto>(requestEditIncome);

            return createRequestEditIncome;
        }

        public async Task<CreateOutcomeDto> DenyOutcomeRequest(int requestId)
        {
            var requestEditOutcome = _repository.GetAll<Outcome>().
                First(request => request.Id == requestId);

            var finance_manager = _repository.GetAll<FITM_BE.Entity.Member>()
               .Where(member => member.Roles.Any(role => role.RoleName == "FM")).ToList();

            requestEditOutcome.FinanceStatus = (Enums.FinanceStatus)3;
            await _repository.Update(requestEditOutcome);

            foreach (var member in finance_manager)
            {
                await ReplyRequestMail(member.Email, 2);
            }

            var createRequestEditOutcome = _mapper.Map<CreateOutcomeDto>(requestEditOutcome);

            return createRequestEditOutcome;
        }

        public async Task<CreateOutcomeDto> AcceptOutcomeRequest(int requestId)
        {
            var requestEditOutcome = await _repository.GetAll<Outcome>().
                FirstAsync(request => request.Id == requestId);

            var finance_manager = _repository.GetAll<FITM_BE.Entity.Member>()
            .Where(member => member.Roles.Any(role => role.RoleName == "FM")).ToList();

            requestEditOutcome.FinanceStatus = (Enums.FinanceStatus)2;
            await _repository.Update(requestEditOutcome);

            foreach (var member in finance_manager)
            {
                await ReplyRequestMail(member.Email, 1);
            }

            var createRequestEditOutcome = _mapper.Map<CreateOutcomeDto>(requestEditOutcome);

            return createRequestEditOutcome;
        }

        public IEnumerable<FinanceDto> GetFinanceReport()
        {
            var outcome = _repository.GetAll<Outcome>()
                .Select(ic => new { Id = ic.Id, Title = ic.Title, Description = ic.Description, Amount = ic.Amount, IsIncome = false, CreatedTime = ic.CreatedTime, ModifiedTime = ic.ModifiedTime, financeStatus = ic.FinanceStatus, BillCode = ic.BillCode });
            var income = _repository.GetAll<Income>()
                .Select(ic => new { Id = ic.Id, Title = ic.Title, Description = ic.Description, Amount = ic.Amount, IsIncome = true, CreatedTime = ic.CreatedTime, ModifiedTime = ic.ModifiedTime, financeStatus = ic.FinanceStatus, BillCode = ic.BillCode });
            var mergedData = outcome.Concat(income)
           .Select(ic => new FinanceDto { Id = ic.Id, Title = ic.Title, Description = ic.Description, Amount = ic.Amount, CreatedTime = ic.CreatedTime.Value, ModifiedTime = ic.ModifiedTime, financeStatus = ic.financeStatus, BillCode = ic.BillCode, IsIncome = ic.IsIncome });

            // Return the merged data
            return mergedData.OrderBy(c => c.financeStatus).ThenByDescending(c => c.CreatedTime).ThenByDescending(c => c.ModifiedTime); ;
        }
        public IEnumerable<FinanceDto> GetBalanceDetail(DateTime start, DateTime end)
        {
            var outcome = _repository.GetAll<Outcome>()
                .Select(ic => new { Id = ic.Id, Title = ic.Title, Description = ic.Description, Amount = ic.Amount, IsIncome = false, CreatedTime = ic.CreatedTime, ModifiedTime = ic.ModifiedTime, financeStatus = ic.FinanceStatus, BillCode = ic.BillCode })
                .Where(ic => ic.ModifiedTime.Value.Date >= start.Date && ic.ModifiedTime.Value.Date <= end.Date && ic.financeStatus == FinanceStatus.Accepted);
            var income = _repository.GetAll<Income>()
                .Select(ic => new { Id = ic.Id, Title = ic.Title, Description = ic.Description, Amount = ic.Amount, IsIncome = true, CreatedTime = ic.CreatedTime, ModifiedTime = ic.ModifiedTime, financeStatus = ic.FinanceStatus, BillCode = ic.BillCode })
                .Where(ic => ic.ModifiedTime.Value.Date >= start.Date && ic.ModifiedTime.Value.Date <= end.Date && ic.financeStatus == FinanceStatus.Accepted);
            var mergedData = outcome.Concat(income)
                .Select(ic => new FinanceDto { Id = ic.Id, Title = ic.Title, Description = ic.Description, Amount = ic.Amount, CreatedTime = ic.CreatedTime.Value, ModifiedTime = ic.ModifiedTime, financeStatus = ic.financeStatus, BillCode = ic.BillCode, IsIncome = ic.IsIncome });

            // Return the merged data
            return mergedData.OrderBy(c => c.financeStatus).ThenByDescending(c => c.ModifiedTime).ThenByDescending(c => c.CreatedTime); ;
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

