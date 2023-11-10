using FITM_BE.Authentication;
using FITM_BE.Authentication.Dtos;
using FITM_BE.Authorization.Utils;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.LoggerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FITM_BE.Controllers
{
    [Policy(nameof(AccountController))]
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
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] string email)
        {
            try
            {
                await accountService.ForgotPassword(email);
                return Ok();
            }
            catch ( NotFoundException ex )
            {
                return NotFound(ex.Message);
            }
            catch ( Exception ex )
            {
                logger.LogError($"Exception in ForgotPassword: {ex}");
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<string> ChangePassword(AccountChangePasswordDTO changeAccountDTO)
        {
            int.TryParse(User.FindFirstValue("UserID"), out int userId);

            changeAccountDTO.Id = userId;

            var s = await accountService.ChangePassword(changeAccountDTO);

            return s;
        }
    }
}
