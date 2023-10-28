using FITM_BE.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FITM_BE.EntityFrameworkCore
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            base.ConfigureConventions(builder);
            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>();
            builder.Properties<TimeOnly>()
                .HaveConversion<TimeOnlyConverter>();
        }

        public DbSet<Member> Members { get; set; }
        public DbSet<RequestEditInfo> RequestEditInfo { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<InstrumentReport> InstrumentReports { get; set; }
        public DbSet<PracticalSchedule> PracticalSchedules { get; set; }
        public DbSet<PracticalDetail> PracticalDetails { get; set; }
        public DbSet<PerformanceSchedule> PerformanceSchedules { get; set; }
        public DbSet<PerformanceMember> PerformanceMembers { get; set; }
        public DbSet<PerformanceSong> PerformanceSongs { get; set; }

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
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Outcome> Outcomes { get; set; }
        public DbSet<Instrument> Instruments { get; set; }
        public DbSet<InstrumentType> InstrumentTypes { get; set; }
    }
}
