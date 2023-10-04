using System.Collections.Generic;
using System.Threading.Tasks;
using FITM_BE.Service.SongService.Dtos;
using FITM_BE.Entity;

namespace FITM_BE.Service.SongService
{
    public interface ISongService
    {
        Task<Song> Create(SongDto songDto);
        List<Song> GetAll();
        Task<Song> GetById(int id);
        Task Update(int id, SongDto songDto);
        Task Delete(int id);
    }
}
