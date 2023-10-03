using AutoMapper.Execution;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.RequestEditInforService;
using FITM_BE.Service.RequestEditInforService.Dtos;
using FITM_BE.Service.Test;
using FITM_BE.Util.Pagging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    [Authorize]
    public class RequestEditInfoController : ApiBase
    {
        private readonly IRequestEditInfoService requestEditInforService;

        public RequestEditInfoController(IRequestEditInfoService requestEditInforService)
        {
            this.requestEditInforService = requestEditInforService;
        }

        [HttpGet]
        public IQueryable<CreateRequestEditInfoDto> GetAll()
        {
            IQueryable<CreateRequestEditInfoDto> requestEditInfoDtos =
                requestEditInforService.getAllRequestEditInfo();
            return requestEditInfoDtos;
        }

        [HttpPost]
        public async Task<PaggingResultDto<CreateRequestEditInfoDto>> GetAllPagging(PaggingDto paggingDto)
        {
            var query = requestEditInforService.getAllRequestEditInfo();
            return await query.GetGridResult(query, paggingDto);
        } 

        [HttpPost]
        public async Task<RequestEditInfoDto> Post(RequestEditInfoDto requestEditInfoDto)
        {
            RequestEditInfo requestEditInfo = await requestEditInforService.Create(requestEditInfoDto);
            return requestEditInfoDto;
        }

        [HttpGet]
        public  CompareRequestDTO GetCompareRequestDto(int createdId, string username)
        {
            CompareRequestDTO compareRequestDTO =  requestEditInforService.getCompareRequest(createdId, username);
            return compareRequestDTO;
        }
    }
}
