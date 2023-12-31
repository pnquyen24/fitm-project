﻿using FITM_BE.Entity.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Entity
{
    [Index(nameof(Name))]
    public class Song : Entity<int>
    {

        [NotNull]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string Author { get; set; }

        [StringLength(300)]
        public string LinkBeat { get; set; }

        [StringLength(300)]
        public string LinkSheet { get; set; }

        [StringLength(300)]
        public string BackgroundImg { get; set; }
    }
}
