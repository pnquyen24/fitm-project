using FITM_BE.Authorization.Utils;
using FITM_BE.Entity;
using FITM_BE.Service.RequestEditInforService;
using FITM_BE.Service.RequestEditInforService.Dtos;
using FITM_BE.Util.Pagging;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FITM_BE.Controllers
{
    [Policy(nameof(RequestEditInfoController))]
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
        public  CompareRequestDTO GetCompareRequest(int Id)
        {
            CompareRequestDTO compareRequestDTO =  requestEditInforService.getCompareRequest(Id);
            return compareRequestDTO;
        }

        [HttpPost]
        public async Task<CreateRequestEditInfoDto> DenyRequest(int id)
        {
            var HR = User.FindFirstValue("Username");
            return  await requestEditInforService.DenyRequest(id, HR);
        }

        [HttpPost]
        public async Task<CreateRequestEditInfoDto> AcceptRequest(int id)
        {
            var HR = User.FindFirstValue("Username");
            return await requestEditInforService.AcceptRequest(id, HR);
        }
    }
}
