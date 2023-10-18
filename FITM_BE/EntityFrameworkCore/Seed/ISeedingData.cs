using FITM_BE.Entity;

namespace FITM_BE.EntityFrameworkCore.Seed
{
    public interface ISeedingData
    {
        public Member SeedMember();
    }
}
