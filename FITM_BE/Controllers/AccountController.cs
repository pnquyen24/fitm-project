using FITM_BE.Authentication;
using FITM_BE.Authentication.Dtos;
using FITM_BE.Service.LoggerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpPut]
        [Authorize]
        public async Task<string> ChangePassword(AccountChangePasswordDTO changeAccountDTO)
        {
            int.TryParse(User.FindFirstValue("UserID"), out int userId);
            
            changeAccountDTO.Id = userId;
            
            var s = await accountService.ChangePassword(changeAccountDTO);
            
            return s;
        }
    }
}
