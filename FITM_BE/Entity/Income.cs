using FITM_BE.Entity.Core;
using FITM_BE.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity
{
    [Index(nameof(Title))]
    public class Income: Entity<int>
    {
        [NotNull]
        [StringLength(30)]
        public string Title { get; set; }
        [NotNull]
        [StringLength(50)]
        public string Description { get; set; }
        [NotNull]
        public long Amount { get; set; }
        [NotNull]
        [StringLength(10)]
        public string BillCode { get; set; }
        public FinanceStatus FinanceStatus { get; set; }
    }
}
