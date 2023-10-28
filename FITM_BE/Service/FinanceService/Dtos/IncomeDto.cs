using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Service.FinanceService.Dtos
{
    [AutoMap(typeof(Income), ReverseMap = true)]
    public class IncomeDto
    {
        public long TotalAmount { get; set; }
        public long Balance { get; set; }
        public FinanceStatus FinanceStatus { get; set; }
        public DateTime? ModifiedTime { get; set; }
    }
}
