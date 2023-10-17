using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.InstrumentReportService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.InstrumentReportService
{
    public class InstrumentReportService : ServiceBase, IInstrumentReportService
    {
        public InstrumentReportService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public async Task<string> Create(InstrumentReportDtos InstrumentReportDtos)
        {
            var instrumentReportDtos = _mapper.Map<InstrumentReport>(InstrumentReportDtos);
            await _repository.Add(instrumentReportDtos);
            return "successfully";
        }

        public async Task<IEnumerable<InstrumentReportDtos>> GetAll()
        {
            var instrumentReports = _repository.GetAll<InstrumentReport>();

            if (instrumentReports.Any())
            {
                var instrumentReportDtos = _mapper.Map<IEnumerable<InstrumentReportDtos>>(instrumentReports);
                return instrumentReportDtos;
            }
            else
            {
                throw new NotFoundException("The list is empty");
            }
        }


    }
}
