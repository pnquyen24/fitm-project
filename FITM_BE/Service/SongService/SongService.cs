using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.SongService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.SongService
{
    public class SongService : ServiceBase, ISongService
    {
        public SongService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public async Task<string> Create(SongDto songDto)
        {
            var song = _mapper.Map<Song>(songDto);
            await _repository.Add(song);
            return "successfully";
        }

        public async Task<IEnumerable<SongDto>> GetAll()
        {
            var songs = _repository.GetAll<Song>();

            if (songs.Any())
            {
                var songDtos = _mapper.Map<IEnumerable<SongDto>>(songs);
                return songDtos;
            }
            else
            {
                throw new NotFoundException("The list is empty");
            }
        }



        public async Task<SongDto> GetById(int id)
        {
            var song = await _repository.Get<Song>(id);
            var songDto = _mapper.Map<SongDto>(song);
            return songDto;
        }

        public async Task Update(int id, SongDto songDto)
        {
            var existingSong = await _repository.Get<Song>(id);


            _mapper.Map(songDto, existingSong);
            await _repository.Update(existingSong);
        }

        public async Task Delete(int id)
        {
            var song = await _repository.Get<Song>(id);
            if (song == null)
            {
                throw new NotFoundException("Song not found");
            }

            await _repository.Delete<Song, int>(id);

        }
    }
}
