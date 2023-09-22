using FITM_BE.Authentication.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Authentication
{
    [Route("[controller]/[Action]")]
    [ApiController]
    public class AcountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AcountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<string> Login(LoginDto loginDto)
        {
            return await _accountService.Login(loginDto);
        }
    }
}
