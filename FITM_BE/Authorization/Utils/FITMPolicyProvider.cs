using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

using static FITM_BE.Authorization.Utils.PolicyAttribute;

namespace FITM_BE.Authorization.Utils
{
    public class FITMPolicyProvider : DefaultAuthorizationPolicyProvider
    {
        public FITMPolicyProvider(IOptions<AuthorizationOptions> options) : base(options)
        {
        }

        public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
        {
            if ( !policyName.StartsWith(Prefix) )
                return await base.GetPolicyAsync(policyName);
            var controllerName = policyName[(Prefix.Length + 1)..];
            var requirement = new PolicyRequirement(controllerName != Ignore ? controllerName : null);
            return new AuthorizationPolicyBuilder()
                .AddRequirements(requirement)
                .Build();
        }
    }
}
