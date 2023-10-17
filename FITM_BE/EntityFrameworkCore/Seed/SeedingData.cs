using FITM_BE.Authentication;
using FITM_BE.Entity;
using NetCore.AutoRegisterDi;

namespace FITM_BE.EntityFrameworkCore.Seed
{
    [RegisterAsTransient]
    public class SeedingData : ISeedingData
    {
        private readonly IConfiguration _configuration;
        private readonly IAccountService _accountService;

        public SeedingData(IAccountService accountService, IConfiguration configuration)
        {
            _accountService = accountService;
            _configuration = configuration;
        }

        public Member SeedMember()
        {
            var adminInfo = _configuration.GetSection("Seeding:Admin");
            var admin = new Member
            {
                FullName = adminInfo.GetValue<string>("fullname"),
                Username = adminInfo.GetValue<string>("username"),
                Email = adminInfo.GetValue<string>("email")
            };

            _accountService.GenerateDefaultAccount(admin);

            return admin;
        }
    }
}
