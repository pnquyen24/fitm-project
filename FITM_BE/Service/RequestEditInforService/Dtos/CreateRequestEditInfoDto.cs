using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Enums;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Service.RequestEditInforService.Dtos
{
    [AutoMap(typeof(RequestEditInfo), ReverseMap = true)]
    public class CreateRequestEditInfoDto
    {
        public int Id { get; set; }
        public string? StudentID { get; set; }
        public DateTime? DOB { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? BankName { get; set; }
        public string? BankNumber { get; set; }
        public string CreatedBy { get; set; }
        public RequestEditInfoStatus Status { get; set; }
    }
}
