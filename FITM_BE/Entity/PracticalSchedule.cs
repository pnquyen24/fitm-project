using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity
{
    [Index(nameof(StartDate))]
    public class PracticalSchedule : Entity<int>
    {
        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        [StringLength(200)]
        public string? Description { get; set; }
        
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }
        
        [Required]
        [DataType(DataType.DateTime)]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(3)]
        public int Room { get; set; }
    }
}