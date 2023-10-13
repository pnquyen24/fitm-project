using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Service.FinanceService.Dtos
{
    [AutoMap(typeof(Outcome), ReverseMap = true)]
    public class OutcomeListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public long Amount { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime ModifiedTime { get; set; }
        public string BillCode { get; set; }
        public FinanceStatus FinanceStatus { get; set; }
    }
}
