using FITM_BE.Authorization.Utils;
using FITM_BE.Service.InstrumentService;
using FITM_BE.Service.InstrumentService.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [Policy(nameof(InstrumentController))]
    public class InstrumentController : ApiBase
    {
        private readonly IInstrumentService _instrumentService;

        public InstrumentController(IInstrumentService instrumentService)
        {
            _instrumentService = instrumentService;
        }

        [HttpGet]
        public IEnumerable<InstrumentDto> GetAllInstrument()
        {
            var query = _instrumentService.GetAll();
            return query.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateAndUpdateInstrumentDto input)
        {
            var newInstrument = await _instrumentService.Create(input);
            return Ok(newInstrument);
        }

        [HttpPut]
        public async Task<IActionResult> Update(CreateAndUpdateInstrumentDto output)
        {
            var updatedInstrument = await _instrumentService.Update(output);
            return Ok(updatedInstrument);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _instrumentService.Delete(id);
        }
    }
}
