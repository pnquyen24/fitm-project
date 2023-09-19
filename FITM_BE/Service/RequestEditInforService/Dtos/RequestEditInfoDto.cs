using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Service.RequestEditInforService.Dtos
{
    public class RequestEditInfoDto
    {
        [StringLength(10)]
        public string? StudentID { get; set; }
        public DateTime? DOB { get; set; }
        [StringLength(30)]
        public string? Email { get; set; }
        [StringLength(11)]
        public string? PhoneNumber { get; set; }
        [StringLength(15)]
        public string? BankName { get; set; }
        [StringLength(20)]
        public string? BankNumber { get; set; }
    }
}
