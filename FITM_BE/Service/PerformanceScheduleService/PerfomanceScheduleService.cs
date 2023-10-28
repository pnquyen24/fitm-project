using AutoMapper;
using AutoMapper.Execution;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Service.PerformanceScheduleService.Dtos;
using FITM_BE.Service.SongService.Dtos;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace FITM_BE.Service.PerformanceScheduleService
{
	public class PerfomanceScheduleService : ServiceBase, IPerformanceScheduleService
	{
		public PerfomanceScheduleService(IRepository repository, IMapper mapper) : base(repository, mapper) { }

		private static DateOnly currentDate = DateOnly.FromDateTime(DateTime.Today);
		public async Task CreatePerformance(PerformanceCreateDTO pfmDTO)
		{
			if (pfmDTO.Date.CompareTo(currentDate) >= 0)
			{
				var pfm = new PerformanceSchedule
				{
					Name = pfmDTO.Name,
					Place = pfmDTO.Place,
					Date = pfmDTO.Date,
					Time = pfmDTO.Time,
					BackgroundImg = pfmDTO.BackgroundImg,
					Songs = pfmDTO.SongIDs.Select(songId => new PerformanceSong
					{
						SongId = songId
					}).ToList()
				};

				await _repository.Add(pfm);
			}
			else
			{
				throw new ArgumentException("Date is invalid");
			}
		}
		public IQueryable<PerformanceDTO> ViewAllPerformance()
		{
			return _repository.GetAll<PerformanceSchedule>()
							  .Include(pfm => pfm.Songs)
							  .ThenInclude(song => song.Song)
							  .OrderBy(pfm => pfm.Status)
							  .ThenByDescending(pfm => pfm.Date)
							  .ThenByDescending(pfm => pfm.Time)
							  .Select(pfm => new PerformanceDTO
							  {
								  Id = pfm.Id,
								  Name = pfm.Name,
								  Place = pfm.Place,
								  Date = pfm.Date,
								  Time = pfm.Time,
								  Status = pfm.Status,
								  BackgroundImg = pfm.BackgroundImg,
								  Songs = pfm.Songs.Select(song => new SongPerformanceDTO
								  {
									  Id = song.Song.Id,
									  Name = song.Song.Name,
								  }).ToList()
							  });

		}

		public IQueryable<PerformanceDTO> ViewPerformance()
		{
			return _repository.GetAll<PerformanceSchedule>()
							  .Where(pfm => pfm.Date.CompareTo(currentDate) >= 0)
							  .Where(pfm => pfm.Status.Equals(Enums.PerformaceStatus.NotYet))
							  .OrderBy(pfm => pfm.Status)
							  .ThenByDescending(pfm => pfm.Date)
							  .ThenByDescending(pfm => pfm.Time)
							  .Select(pfm => new PerformanceDTO
							  {
								  Id = pfm.Id,
								  Name = pfm.Name,
								  Place = pfm.Place,
								  Date = pfm.Date,
								  Time = pfm.Time,
								  Status = pfm.Status,
								  BackgroundImg = pfm.BackgroundImg,
							  });

		}

		public async Task<PerformanceDetail?> ViewPerformanceDetail(int pfmID)
		{
			var pfms = _repository.GetAll<PerformanceSchedule>()
							   .Where(pfm => pfm.Id == pfmID)
							   .Include(pfm => pfm.Songs)
							   .ThenInclude(song => song.Song)
							   .Include(pfm => pfm.Members)
							   .ThenInclude(member => member.Member)
							   .Select(pfm => new PerformanceDetail
							   {
								   Id = pfm.Id,
								   Date = pfm.Date,
								   Place = pfm.Place,
								   BackgroundImg = pfm.BackgroundImg,
								   Time = pfm.Time,
								   Name = pfm.Name,
								   Members = pfm.Members.Select(member => new MemberPerformanceDTO
								   {
									   Id = member.Member.Id,
									   Name = member.Member.FullName
								   }).ToList(),
								   Songs = pfm.Songs.Select(song => new SongPerformanceDTO
								   {
									   Id = song.Song.Id,
									   Name = song.Song.Name,
								   }).ToList()
							   });

			return await pfms.FirstOrDefaultAsync();
		}

		public async Task UpdatePerformance(PerformanceUpdateDTO pfmDTO)
		{
			if (pfmDTO.Date.CompareTo(currentDate) >= 0)
			{
				var pfm = await _repository.GetAll<PerformanceSchedule>()
									.Where(pfm => pfm.Id == pfmDTO.Id)
									.Where(pfm => pfm.Date.CompareTo(currentDate) >= 0)
									.Include(pfm => pfm.Songs).FirstOrDefaultAsync();

				if (pfm is not null)
				{

					pfm.Songs.Clear();

					pfm.Name = pfmDTO.Name;
					pfm.Place = pfmDTO.Place;
					pfm.Date = pfmDTO.Date;
					pfm.Time = pfmDTO.Time;
					pfm.BackgroundImg = pfmDTO.BackgroundImg;
					pfm.Songs = pfmDTO.SongIDs.Select(songId => new PerformanceSong
					{
						SongId = songId
					}).ToList();

					await _repository.Update(pfm);
				}
				else
				{
					throw new NotFoundException($"{nameof(PerformanceSchedule)} not found");
				}
			}
			else
			{
				throw new ArgumentException("Date is invalid");
			}
		}
		public async Task DeletePerformance(int pfmID)
		{
			var pfm = await _repository.GetAll<PerformanceSchedule>()
								  .Where(pfm => pfm.Id == pfmID)
								  .Where(pfm => pfm.Date.CompareTo(currentDate) >= 0)
								  .FirstOrDefaultAsync();

			if (pfm is null)
			{
				throw new NotFoundException($"{nameof(PerformanceSchedule)} not found");
			}

			if (!(pfm.Status == Enums.PerformaceStatus.Done))
			{
				await _repository.Delete<PerformanceSchedule>(pfmID);
			}
			else
			{
				throw new SystemException();
			}
		}

		public async Task JoinPerformance(int pfmID, int MemberID)
		{
			var pfm = await _repository.GetAll<PerformanceSchedule>()
									.Where(pfm => pfm.Id == pfmID)
									.Include(pfm => pfm.Members).FirstOrDefaultAsync();
			if (pfm is null)
			{
				throw new NotFoundException($"{nameof(PerformanceSchedule)} not found");
			}

			var member = pfm.Members.Any(m => m.MemberId == MemberID);

			if (!member)
			{
				pfm.Members.Add(new PerformanceMember
				{
					MemberId = MemberID
				});

				await _repository.Update(pfm);
			}
			else
			{
				throw new Exception();
			}

		}

		public async Task CallOffPerformance(int pfmID)
		{
			var pfm = await _repository.GetAll<PerformanceSchedule>()
								   .Where(pfm => pfm.Id == pfmID)
								   .Where(pfm => pfm.Date.CompareTo(currentDate) >= 0)
								   .Where(pfm => pfm.Status != Enums.PerformaceStatus.CallOff)
								   .Include(pfm => pfm.Songs).FirstOrDefaultAsync();

			if (pfm is not null)
			{
				pfm.Status = Enums.PerformaceStatus.CallOff;
				await _repository.Update(pfm);
			}
			else
			{
				throw new NotFoundException($"{nameof(PerformanceSchedule)} not found");
			}
		}

		public async Task<PerformanceViewAttendDTO?> ViewListMembers(int pfmID)
		{
			var pfmAttendance = _repository.GetAll<PerformanceSchedule>()
							   .Where(pfm => pfm.Id == pfmID)
							   .Include(pfm => pfm.Members)
							   .ThenInclude(member => member.Member)
							   .Select(pfm => new PerformanceViewAttendDTO
							   {

								   PerformanceId = pfm.Id,
								   Members = pfm.Members.Select(member => new MemberForAttendanceDto
								   {
									   Id = member.Member.Id,
									   StudentID = member.Member.StudentID,
									   FullName = member.Member.FullName,
									   Attendance = member.AttendanceStatus
								   }).ToList()

							   });

			return await pfmAttendance.FirstOrDefaultAsync();
		}

		public async Task AttendancePerformance(PerformanceAttendanceDTO pfmAttend)
		{
			var pfm = await _repository.GetAll<PerformanceSchedule>()
								   .Where(pfm => pfm.Id == pfmAttend.PerformanceId)
								   .Where(pfm => pfm.Date.CompareTo(currentDate) >= 0)
								   .Include(pfm => pfm.Members).FirstOrDefaultAsync();

			if (pfm is not null)
			{

				pfm.Members.Clear();

				pfm.Members = pfmAttend.Members.Select(member => new PerformanceMember
				{
					MemberId = member.Id,
					AttendanceStatus = member.Attendance

				}).ToList();

				await _repository.Update(pfm);
			}
			else
			{
				throw new NotFoundException($"{nameof(PerformanceSchedule)} not found");
			}
		}
	}
}
