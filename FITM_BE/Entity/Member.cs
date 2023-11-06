using FITM_BE.Authorization.Role;
using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity
{
    [Index(nameof(StudentID))]
    public class Member : Entity<int>
    {
        [NotNull]
        [StringLength(50)]
        public string FullName { get; set; }

        [NotNull]
        [StringLength(20)]
        public string Username { get; set; }

        [NotNull]
        [StringLength(30)]
        public string Email { get; set; }

        [NotNull]
        [StringLength(256)]
        public string Password { get; set; }

        [StringLength(10)]
        public string? StudentID { get; set; }

        public DateTime DOB { get; set; }

        [StringLength(11)]
        public string? PhoneNumber { get; set; }

        [StringLength(15)]
        public string? BankName { get; set; }

        [StringLength(20)]
        public string? BankNumber { get; set; }

        public string? Avatar { get; set; }

        public bool Status { get; set; }
        public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
    }
}
