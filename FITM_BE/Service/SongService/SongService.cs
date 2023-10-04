﻿using System.Collections.Generic;
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

        public async Task<Song> Create(SongDto songDto)
        {
            var song = _mapper.Map<Song>(songDto);
            await _repository.Add(song);
            return song;
        }

        public List<Song> GetAll()
        {
            List<Song> songs = _repository.GetAll<Song>().ToList();
            if (songs.Any()) return songs;
            else throw new NotFoundException("The list is empty");
        }

        public async Task<Song> GetById(int id)
        {
            var song = await _repository.Get<Song>(id);
            if (song != null) return song;
            else throw new NotFoundException("Song not found");
        }

        public async Task Update(int id, SongDto songDto)
        {
            var existingSong = await _repository.Get<Song>(id);
            if (existingSong == null)
            {
                throw new NotFoundException("Song not found");
            }

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
