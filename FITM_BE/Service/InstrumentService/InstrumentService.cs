using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.InstrumentService.Dtos;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;

namespace FITM_BE.Service.InstrumentService
{
    public class InstrumentService : ServiceBase, IInstrumentService
    {
        public InstrumentService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task<InstrumentDto> Create(CreateAndUpdateInstrumentDto input)
        {
            var type = _repository.GetAll<InstrumentType>()
                                .Include(type => type.Instruments)
                                .FirstOrDefault(type => type.FullName.ToLower() == input.Name.ToLower()
                        && type.ShortName.ToLower() == input.ShortName.ToLower());

            if (type == null)
            {
                type = new InstrumentType
                {
                    FullName = input.Name,
                    ShortName = input.ShortName,
                };
                type = await _repository.Add(type).ConfigureAwait(false);
            }
            var newInstrument = new Instrument
            {
                Type = type,
                Status = Enums.InstrumentStatus.New
            };
            var instrument = await _repository.Add(newInstrument);
            return new()
            {
                Id = type.Id,
                Name = type.FullName,
                Count = type.Instruments?.Count ?? 0,
                ItemIds = type.Instruments?.Select(item => new InstrumentItemDto
                {
                    Id = item.Id,
                    Status = item.Status,
                }).ToList() ?? new List<InstrumentItemDto>()
            };
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<InstrumentDto> GetAll()
        {
            var query = _repository.GetAll<Instrument>()
                .Include(instrument => instrument.Type)
                .Where(instrument => !instrument.Type.IsDeleted)
                .GroupBy(instrument => instrument.Type)
                .Select(data => new InstrumentDto
                {
                    Id = data.Key.Id,
                    Name = data.Key.FullName,
                    Count = data.Count(),
                    ItemIds = data.Select(item => new InstrumentItemDto
                    {
                        Id = item.Id,
                        Status = item.Status,
                    }).ToList()
                });
            return query;
        }

        public async Task<InstrumentItemDto> Update(CreateAndUpdateInstrumentDto input)
        {
            var instrument = _repository.Get<Instrument>(input.InstrumentId);
            instrument.Status = input.Status;

            var newInstrument = await _repository.Update(instrument);

            return new InstrumentItemDto
            {
                Id = newInstrument.Id,
                Status = newInstrument.Status,
            };
        }
    }
}
