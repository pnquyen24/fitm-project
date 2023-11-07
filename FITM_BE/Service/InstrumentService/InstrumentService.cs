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
                .FirstOrDefault(type => type.FullName.ToLower() == input.Name.ToLower()
                && type.ShortName.ToLower() == input.ShortName.ToLower());

            dynamic instrument;

            if (type == null)
            {
                type = new InstrumentType
                {
                    FullName = input.Name,
                    ShortName = input.ShortName,
                };
                type.Instruments = new List<Instrument> { new Instrument
                {
                    Type = type,
                    Status = Enums.InstrumentStatus.New
                } };
                instrument = await _repository.Add(type);
            }
            else
            {
                var newInstrument = new Instrument
                {
                    Type = type,
                    Status = Enums.InstrumentStatus.New
                };
                instrument = await _repository.Add(newInstrument);
            }

            return new();
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

        public async Task<InstrumentDto> Update(CreateAndUpdateInstrumentDto input)
        {
            var type = await _repository.GetAll<InstrumentType>()
                .FirstOrDefaultAsync(type => type.FullName.ToLower().Equals(input.Name.ToLower())
                && type.ShortName.ToLower().Equals(input.ShortName.ToLower()));
            if (type == null)
            {
                type = new InstrumentType
                {
                    FullName = input.Name,
                    ShortName = input.ShortName,
                };
                type.Instruments = new List<Instrument> { new Instrument
                {
                    Type = type,
                    Status = Enums.InstrumentStatus.New
                } };
                type = await _repository.Add(type);
            }
            var newInstrument = new Instrument
            {
                Id = input.Id,
                Type = type,
                Status = input.Status,
            };

            newInstrument = await _repository.Update(newInstrument);

            return new ();
        }
    }
}
