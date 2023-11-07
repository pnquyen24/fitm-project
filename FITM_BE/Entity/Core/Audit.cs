using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity.Core
{
    public class Audit
    {
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public virtual Member? CreatedBy { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public int? CreatedById { get; set; }

        public DateTime? CreatedTime { get; set; }

        [DeleteBehavior(DeleteBehavior.NoAction)]
        public virtual Member? ModifyBy { get; set; }

        [ForeignKey(nameof(ModifyBy))]
        public int? ModifiedById { get; set; }

        public DateTime? ModifiedTime { get; set; }

        public bool IsDeleted { get; set; }
    }
}
