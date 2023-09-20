using FITM_BE.Entity.Core;
using FITM_BE.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity
{
    [Index(nameof(Status))]
    public class RequestEditInfo : Entity<int>
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
        public RequestEditInfoStatus Status { get; set; }
    }
}
