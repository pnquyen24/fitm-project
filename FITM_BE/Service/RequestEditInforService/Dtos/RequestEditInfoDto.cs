using AutoMapper;
using FITM_BE.Entity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Service.RequestEditInforService.Dtos
{
    [AutoMap(typeof(RequestEditInfo), ReverseMap = true)]
    public class RequestEditInfoDto
    {
        public string? StudentID { get; set; }
        public DateTime? DOB { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? BankName { get; set; }
        public string? BankNumber { get; set; }
    }
}
