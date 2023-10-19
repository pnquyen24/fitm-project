namespace FITM_BE.Service.InstrumentService.Dtos
{
    public class InstrumentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public IEnumerable<int> ItemIds { get; set; }
    }
}
