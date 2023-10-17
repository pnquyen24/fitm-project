using AutoMapper;
using FITM_BE.Service.InstrumentReportService;
using FITM_BE.Service.InstrumentReportService.Dtos;
using FITM_BE.Service.SongService;
using FITM_BE.Service.SongService.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    public class InstrumentReportControl : ApiBase
    {
        private readonly IInstrumentReportService _instrumentReportService;
        private readonly IMapper _mapper;

        public InstrumentReportControl(IInstrumentReportService instrumentReportService, IMapper mapper)
        {
            _instrumentReportService = instrumentReportService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstrumentReportDtos>>> GetAllInstrumentReport()
        {
            var instrumentReports = await Task.Run(() => _instrumentReportService.GetAll());

            return Ok(instrumentReports);
        }


        [HttpPost]
        public async Task<IActionResult> CreateIstrumentReport(InstrumentReportDtos instrumentReportDtos)
        {
            if (instrumentReportDtos == null)
            {
                return BadRequest();
            }

            var result = await _instrumentReportService.Create(instrumentReportDtos);

            return Ok(result);
        }
    }
}
