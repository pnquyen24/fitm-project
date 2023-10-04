using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity
{
    [Index(nameof(CreatedBy))]
    public class Song : Entity<int>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Trường ID mới

        [NotNull]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string LinkBeat { get; set; }

        [StringLength(500)]
        public string LinkSheet { get; set; }

        [StringLength(500)]
        public string BackgroundImg { get; set; }
    }
}
