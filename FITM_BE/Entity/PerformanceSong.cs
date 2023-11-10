using FITM_BE.Entity.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace FITM_BE.Entity
{
    public class PerformanceSong : Entity<int>
    {
        [ForeignKey(nameof(PerformanceSchedule))]
        public int PerformanceId { get; set; }
        public PerformanceSchedule PerformanceSchedule { get; set; }

        [ForeignKey(nameof(Song))]
        public int SongId { get; set; }
        public Song Song { get; set; }

    }
}
