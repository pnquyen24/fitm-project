using AutoMapper;
using FITM_BE.Entity;

namespace FITM_BE.Service.PracticalSchedulService.Dtos
{
    [AutoMap(typeof(Outcome), ReverseMap = true)]
    public class CreateOutcomeDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long Amount { get; set; }
        public string BillCode { get; set; }
    }
}
