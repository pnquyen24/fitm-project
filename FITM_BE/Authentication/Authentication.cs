using FITM_BE.Entity;
using FITM_BE.Util;
using Microsoft.AspNetCore.Identity;
using NetCore.AutoRegisterDi;

namespace FITM_BE.Authentication
{
    [RegisterAsTransient]
    public class Authentication : PasswordHasher<Member>
    { }
}
