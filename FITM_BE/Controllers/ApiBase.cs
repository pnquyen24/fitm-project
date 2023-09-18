using FITM_BE.DependencyInjection;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [ApiController]
    [Route("apis/[controller]/[action]")]
    public class ApiBase : ControllerBase
    {
    }
}
