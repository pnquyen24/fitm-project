using FITM_BE.Entity.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace FITM_BE.Entity
{
    public class PerformanceSong : Entity<int>
    {
        [ForeignKey("PerformanceSchedule")]
        public int PerformanceId { get; set; }
        public PerformanceSchedule PerformanceSchedule { get; set; }

        [ForeignKey("Song")]
        public int SongId { get; set; }
        public Song Song { get; set; }

    }
}
