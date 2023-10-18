using FITM_BE.Entity.Core;
using FITM_BE.Enums;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity
{
    public class PerformanceSchedule : Entity<int>
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Place { get; set; }
        [DataType(DataType.Date)]
        public DateOnly Date { get; set; }
        [Required]
        [DataType(DataType.Time)]
        public TimeOnly Time { get; set; }
        [StringLength(500)]
        public string? BackgroundImg { get; set; } = ""; 
        public PerformaceStatus Status { get; set; } = PerformaceStatus.NotYet;
        public virtual ICollection<PerformanceSong> Songs { get; set; } = new List<PerformanceSong>();
        public virtual ICollection<PerformanceMember> Members { get; set; } = new List<PerformanceMember>();
    
    }
}