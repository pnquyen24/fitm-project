using AutoMapper;
using FITM_BE.Entity;
using System.ComponentModel.DataAnnotations;

namespace FITM_BE.Service.SongService.Dtos
{
    [AutoMap(typeof(Song), ReverseMap = true)]
    public class SongPerformanceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
