using FITM_BE.Entity.Core;
using FITM_BE.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace FITM_BE.Entity
{
    public class PerformanceMember : Entity<int>
    {
        [ForeignKey("PerformanceSchedule")]
        public int PerformanceId { get; set; }
        public PerformanceSchedule PerformanceSchedule { get; set; }

        [ForeignKey("Member")]
        public int MemberId { get; set; }
        public Member Member { get; set; }

        public AttendanceStatus AttendanceStatus { get; set; } = AttendanceStatus.NotYet;
    }
}
