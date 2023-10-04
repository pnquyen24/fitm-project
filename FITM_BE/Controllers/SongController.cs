using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Service.SongService;
using FITM_BE.Service.SongService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FITM_BE.Controllers
{
    
    public class SongController : ApiBase
    {
        private readonly ISongService _songService;
        private readonly IMapper _mapper;

        public SongController(ISongService songService, IMapper mapper)
        {
            _songService = songService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongDto>>> GetAllSongs()
        {
            var songs = await Task.Run(() => _songService.GetAll());
            var songDtos = _mapper.Map<IEnumerable<SongDto>>(songs);
            return Ok(songDtos);
        }


        [HttpPost]
        public async Task<IActionResult> CreateSong(SongDto songDto)
        {
            if (songDto == null)
            {
                return BadRequest();
            }

            var result = await _songService.Create(songDto);

            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<SongDto>> GetSongById(int id)
        {
            var song = await _songService.GetById(id);

            if (song == null)
            {
                return NotFound();
            }

            var songDto = _mapper.Map<SongDto>(song);

            return Ok(songDto);
        }
    }
}
