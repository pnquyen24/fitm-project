using FITM_BE.Entity.Core;
using FITM_BE.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FITM_BE.Entity
{
    [Index(nameof(TypeId))]
    public class Instrument : Entity<int>
    {
        [Required, ForeignKey(nameof(Type))]
        public int TypeId { get; set; }

        public virtual InstrumentType Type { get; set; }

        [Required]
        public InstrumentStatus Status { get; set; }
    }
}
