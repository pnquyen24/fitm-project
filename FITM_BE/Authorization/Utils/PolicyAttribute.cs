using Microsoft.AspNetCore.Authorization;

namespace FITM_BE.Authorization.Utils
{
    public class PolicyAttribute : AuthorizeAttribute
    {
        internal const string Prefix = "POLICY";
        internal const string Ignore = "IGNORE";
        private const string Separetor = "_";
        private const string Controller = "Controller";
        public PolicyAttribute(string controllerName)
        {
            if ( controllerName.EndsWith(Controller) )
                controllerName = controllerName.Replace(Controller, "");
            Policy = $"{Prefix}{Separetor}{controllerName}";
        }

        public PolicyAttribute()
        { 
            Policy = $"{Prefix}{Separetor}{Ignore}";
        }
    }
}
