using FITM_BE.Entity;
using FITM_BE.Service.InstrumentReportService.Dtos;
namespace FITM_BE.Service.InstrumentReportService
{
    public interface IInstrumentReportService
    {
        Task<string> Create(InstrumentReportDtos InstrumentReportDtos);
        Task<IEnumerable<InstrumentReportDtos>> GetAll();
    }
}
