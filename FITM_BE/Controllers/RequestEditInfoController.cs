using AutoMapper.Execution;
using FITM_BE.Service.RequestEditInforService;
using FITM_BE.Service.Test;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    public class RequestEditInfoController : ApiBase
    {
        private readonly IRequestEditInfoService requestEditInforService;

        public RequestEditInfoController(IRequestEditInfoService requestEditInforService)
        {
            this.requestEditInforService = requestEditInforService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Not implement");
        }
    }
}
