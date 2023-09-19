using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity.Core
{
    public class Audit
    {
        [ForeignKey(nameof(CreatedById))]
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public virtual Member? CreatedBy { get; set; }

        public int? CreatedById { get; set; }

        public DateTime? CreatedTime { get; set; }

        [ForeignKey(nameof(ModifiedById))]
        [DeleteBehavior(DeleteBehavior.NoAction)]
        public virtual Member? ModifyBy { get; set; }

        public int? ModifiedById { get; set; }

        public DateTime? ModifiedTime { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
