using Microsoft.EntityFrameworkCore;

namespace FITM_BE.EntityFrameworkCore.Seed
{
    public interface ISeedingData
    {
        public void SeedMember<TDbContext>(TDbContext context, IServiceProvider serviceProvider) where TDbContext : DbContext;
        public void SeedRole<TDbContext>(TDbContext context, IServiceProvider serviceProvider) where TDbContext : DbContext;
    }
}
