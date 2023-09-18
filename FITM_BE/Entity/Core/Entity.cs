using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity.Core
{
    public class Entity<TKey> : Audit
    {
        [Key]
        public TKey Id { get; set; }
    }
}
