using Microsoft.AspNetCore.Authorization;

namespace FITM_BE.Authorization.Utils
{
    public class PolicyRequirement : IAuthorizationRequirement
    {
        public string? ControllerName
        {
            get; set;
        }
        public PolicyRequirement(string? controllerName)
        {
            ControllerName = controllerName;
        }
    }
}
