using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FITM_BE.Service.SongService.Dtos;
using FITM_BE.Entity;

namespace FITM_BE.Service.SongService
{
    public interface ISongService
    {
        Task<string> Create(SongDto songDto);
        Task<IEnumerable<SongDto>> GetAll();
        Task<SongDto> GetById(int id);
        Task Update(int id, SongDto songDto);
        Task Delete(int id);
    }
}
