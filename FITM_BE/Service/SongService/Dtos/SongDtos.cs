using AutoMapper;
using FITM_BE.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FITM_BE.Service.SongService.Dtos
{
    [AutoMap(typeof(Song), ReverseMap = true)]
    public class SongDto
    {

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(500)]
        public string LinkBeat { get; set; }

        [StringLength(500)]
        public string LinkSheet { get; set; }

        [StringLength(500)]
        public string BackgroundImg { get; set; }
    }
}
