using FITM_BE.Service.InstrumentService.Dtos;

namespace FITM_BE.Service.InstrumentService
{
    public interface IInstrumentService
    {
        public IQueryable<InstrumentDto> GetAll();
        public Task<InstrumentDto> Create(CreateAndUpdateInstrumentDto input);
        public Task<InstrumentDto> Update(CreateAndUpdateInstrumentDto input);
        public Task Delete(int id);
    }
}
