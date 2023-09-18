using NetCore.AutoRegisterDi;

namespace FITM_BE.DependencyInjection
{
    public static class RegisterDIAuto
    {
        public static void AddDIAuto(this IServiceCollection services)
        {
            var tes = services.RegisterAssemblyPublicNonGenericClasses()
                    .Where(service => service.Name.EndsWith("Service") || service.Name.Equals("Repository") || service.Name.Equals("Authentication"))
                    .AsPublicImplementedInterfaces();
        }
    }
}
