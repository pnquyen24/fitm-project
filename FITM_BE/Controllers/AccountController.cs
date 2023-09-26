using FITM_BE.Authentication;
using FITM_BE.Service.LoggerService;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    public class AccountController : ApiBase
    {
        private readonly ILoggerManager logger;
        public readonly IAccountService accountService;

        public AccountController(IAccountService accountService, ILoggerManager logger)
        {
            this.accountService = accountService;
            this.logger = logger;
        }

        //ForgotPassword function
        [HttpPost]
        public async Task<bool> ForgotPassword([FromBody]string email)
        {
            if (await accountService.ForgotPassword(email))
            {
                logger.LogInfo("Sent email successfully.");
                return true;
            }
            logger.LogError("Email does not exist.");
            return false;
        }
    }
}
