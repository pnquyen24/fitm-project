using FITM_BE.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Authorization.Role
{
    public class Role : Entity<int>
    {
        [StringLength(20)]
        public string RoleName { get; set; }

        [StringLength(50)]
        public string DisplayName { get; set; }

        public ICollection<string> PermissionName { get; set; } = new List<string>();
    }
}
