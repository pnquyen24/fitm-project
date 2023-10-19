using FITM_BE.Enums;

namespace FITM_BE.Service.InstrumentService.Dtos
{
    public class CreateAndUpdateInstrumentDto
    {
        public int Id { get; set; }
        public string SortName { get; set; }
        public string Name { get; set; }
        public InstrumentStatus Status { get; set; }
    }
}
