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
        public DbSet<InstrumentReport> InstrumentReports { get; set; }

        public DbSet<PracticalSchedule> PracticalSchedules { get; set; }
    }
}
