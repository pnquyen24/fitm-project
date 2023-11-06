using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity
{
    [Index(nameof(ShortName))]
    public class InstrumentType : Entity<int>
    {
        [Required, StringLength(50)]
        public string FullName { get; set; }

        [Required, StringLength(50)]
        public string ShortName { get; set; }

        public virtual ICollection<Instrument> Instruments { get; set; } = new List<Instrument>();
    }
}
