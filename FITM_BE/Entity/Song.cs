using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity
{
    [Index(nameof(CreatedBy))]
    public class Song : Entity<int>
    {
        [NotNull]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string LinkBeats { get; set; }

        [StringLength(500)]
        public string LinkSheet { get; set; }

        [NotNull]
        public int CreatedBy { get; set; }

        [NotNull]
        public DateTime CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public int? ModifiedBy { get; set; }

        public bool IsDeleted { get; set; }

        public bool Status { get; set; }
    }
}
