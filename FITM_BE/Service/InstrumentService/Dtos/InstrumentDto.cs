using FITM_BE.Enums;

namespace FITM_BE.Service.InstrumentService.Dtos
{
    public class InstrumentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public IEnumerable<InstrumentItemDto> ItemIds { get; set; }
    }

    public class InstrumentItemDto
    {
        public int Id { get; set; }
        public InstrumentStatus Status { get; set; }
    }
}
