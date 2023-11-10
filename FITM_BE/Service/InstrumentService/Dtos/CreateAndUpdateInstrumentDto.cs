using FITM_BE.Enums;

namespace FITM_BE.Service.InstrumentService.Dtos
{
    public class CreateAndUpdateInstrumentDto
    {
        public int InstrumentId { get; set; }
        public string ShortName { get; set; }
        public string Name { get; set; }
        public InstrumentStatus Status { get; set; }
    }
}
