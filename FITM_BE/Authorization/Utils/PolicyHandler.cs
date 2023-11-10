using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace FITM_BE.Authorization.Utils
{
    public class PolicyHandler : AuthorizationHandler<PolicyRequirement>
    {
        private readonly IServiceProvider _serviceProvider;

        public PolicyHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PolicyRequirement requirement)
        {
            if (requirement.ControllerName == null )
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            var config = _serviceProvider.GetService<IConfiguration>();
            if ( config != null )
            {
                var permissions = config.GetSection("Seeding:Permissions").Get<IEnumerable<Permission>>();
                var roles = permissions.FirstOrDefault(permission => permission.Name == requirement.ControllerName)?.Roles;
                if ( roles != null && roles.Any(role => context.User.HasClaim("Roles", role)) )
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }
            context.Fail();
            return Task.CompletedTask;
        }
    }
    public class Permission
    {
        public string Name
        {
            get; set;
        }
        public ICollection<string> Roles { get; set; } = new List<string>();
    }
}
