using FITM_BE.Authentication;
using FITM_BE.Authorization.Role;
using FITM_BE.Entity;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetCore.AutoRegisterDi;

namespace FITM_BE.EntityFrameworkCore.Seed
{
    [RegisterAsTransient]
    public class SeedingData : ISeedingData
    {

        public void SeedMember<TDbContext>(TDbContext context, IServiceProvider serviceProvider) where TDbContext : DbContext
        {
            if ( !context.Set<Member>().Any() )
            {
                var configuration = serviceProvider.GetRequiredService<IConfiguration>();
                var accountService = serviceProvider.GetRequiredService<IAccountService>();
                var adminInfo = configuration.GetSection("Seeding:Admin");
                var admin = new Member
                {
                    FullName = adminInfo.GetValue<string>("fullname"),
                    Username = adminInfo.GetValue<string>("username"),
                    Email = adminInfo.GetValue<string>("email"),
                    Roles = context.Set<Role>().Where(role => role.RoleName == adminInfo.GetValue<string>("role")).ToList(),
                };
                accountService.GenerateDefaultAccount(ref admin);
                context.Add(admin);
                context.SaveChanges();
            }

        }

        public void SeedRole<TDbContext>(TDbContext context, IServiceProvider serviceProvider) where TDbContext : DbContext
        {
            var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var roleInfo = configuration.GetSection("Seeding:Roles").Get<string[]>();
            var currents = context.Set<Role>().ToList();
            var roles = roleInfo.Select(role => new Role
            {
                RoleName = role,
            });
            var deletes = currents
                .Where(currents => !roles.Any(role => role.RoleName == currents.RoleName));
            var adds = roles.Where(role => !currents.Any(current => current.RoleName == role.RoleName));

            if ( adds.Any() )
            {
                context.AddRange(adds);
            }

            if ( deletes.Any() )
            {
                context.RemoveRange(deletes);
            }
            context.SaveChanges();
        }
    }
}
