using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [ApiController]
    [Route("apis/[controller]/[action]")]
    [Authorize]
    public class ApiBase : ControllerBase
    {
    }
}
