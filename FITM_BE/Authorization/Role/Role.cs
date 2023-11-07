using FITM_BE.Entity;
using FITM_BE.Entity.Core;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Authorization.Role
{
    public class Role : Entity<int>
    {
        [StringLength(20)]
        public string RoleName
        {
            get; set;
        }
        public virtual ICollection<Member> Members
        {
            get; set;
        } = new List<Member>();
    }
}
