using NetCore.AutoRegisterDi;

namespace FITM_BE.DependencyInjection
{
    public static class RegisterDIAuto
    {
        private static readonly string[] specialService =
        {
            "Repository",
            "Authentication",
            "EmailSender",
            "LoggerManager",
            "SeedingData"
        };

        public static void AddDIAuto(this IServiceCollection services)
        {
            var tes = services.RegisterAssemblyPublicNonGenericClasses()
                    .Where(service => service.Name.EndsWith("Service")
                    || specialService.Contains(service.Name))
                    .AsPublicImplementedInterfaces();
        }
    }
}
