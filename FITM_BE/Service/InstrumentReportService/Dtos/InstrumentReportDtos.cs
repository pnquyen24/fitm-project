using AutoMapper;
using FITM_BE.Entity;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace FITM_BE.Service.InstrumentReportService.Dtos
{
    [AutoMap(typeof(InstrumentReport), ReverseMap = true)]
    public class InstrumentReportDtos
    {
        public int Id { get; set; }

        [NotNull]
        [StringLength(10)]
        public string InstrumentID { get; set; }

        [NotNull]
        [StringLength(10)]
        public string MemberID { get; set; }

        [StringLength(500)]
        public string Desciption { get; set; }
    }
}
