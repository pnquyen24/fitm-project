using AutoMapper.Execution;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.RequestEditInforService;
using FITM_BE.Service.RequestEditInforService.Dtos;
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
        public List<CreateByRequestEditInfoDto> GetAll()
        {
            List<CreateByRequestEditInfoDto> requestEditInfoDtos =
                requestEditInforService.getAllRequestEditInfo();
            return requestEditInfoDtos;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RequestEditInfoDto requestEditInfoDto)
        {
            RequestEditInfo requestEditInfo = await requestEditInforService.Create(requestEditInfoDto);
            return Ok(requestEditInfo);
        }
    }
}
