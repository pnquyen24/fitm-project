using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity
{
    [Index(nameof(MemberID))]

    public class InstrumentReport : Entity<int>
    {
        [NotNull]
        [StringLength(10)]
        public string InstrumentID { get; set; }

        [NotNull]
        [StringLength(10)]
        public string MemberID  { get; set; }

        [StringLength(500)]
        public string Desciption { get; set; }

    }
}
