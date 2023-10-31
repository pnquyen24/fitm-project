using FITM_BE.Entity.Core;
using FITM_BE.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity
{
    [Index(nameof(PracticalScheduleId))]
    public class PracticalDetail : Entity<int>
    {
        public int MemberId { get; set; }
        public Member Member { get; set; }

        public int PracticalScheduleId { get; set; }
        public PracticalSchedule? PracticalSchedule { get; set; }

        [Required]
        public AttendanceStatus Attendance { get; set; } = AttendanceStatus.NotYet;
    }
}