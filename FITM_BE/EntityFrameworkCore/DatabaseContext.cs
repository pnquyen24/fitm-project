using FITM_BE.Entity;
using Microsoft.EntityFrameworkCore;

namespace FITM_BE.EntityFrameworkCore
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Member> Members { get; set; }
        public DbSet<RequestEditInfo> RequestEditInfo { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<PracticalSchedule> PracticalSchedules { get; set; }
        public DbSet<PracticalDetail> PracticalDetails { get; set; }
        public DbSet<PerformanceSchedule> PerformanceSchedules { get; set; }
        public DbSet<PerformanceMember> PerformanceMembers { get; set; }
        public DbSet<PerformanceSong> PerformanceSongs { get; set; }

    }

    public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
    {
        public DateOnlyConverter() : base(
            dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),
            dateTime => DateOnly.FromDateTime(dateTime))
        { }
    }
    public class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
    {
        public TimeOnlyConverter() : base(
            timeOnly => timeOnly.ToTimeSpan(),
            timeSpan => TimeOnly.FromTimeSpan(timeSpan))
        { }
    }
}
