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

        [HttpPut]
        public void Create(CreateAndUpdateInstrumentDto input)
        {
            _instrumentService.Create(input);
        }

        [HttpPost]
        public void Update(CreateAndUpdateInstrumentDto output)
        {
            _instrumentService.Update(output);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _instrumentService.Delete(id);
        }
    }
}
