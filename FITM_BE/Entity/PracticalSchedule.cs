﻿using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Entity
{
    [Index(nameof(Date))]
    public class PracticalSchedule : Entity<int>
    {
        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        [StringLength(200)]
        public string? Description { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateOnly Date { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public TimeOnly StartTime { get; set; }
        
        [Required]
        [DataType(DataType.DateTime)]
        public TimeOnly EndTime { get; set; }

        [Required]
        public int Room { get; set; }
    }
}