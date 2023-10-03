using FITM_BE.Entity;
using FITM_BE.Service.RequestEditInforService.Dtos;

namespace FITM_BE.Service.RequestEditInforService
{
    public interface IRequestEditInfoService
    {
        public IQueryable<CreateRequestEditInfoDto> getAllRequestEditInfo();
        public Task<RequestEditInfo> Create(RequestEditInfoDto requestEditInfoDto);
        public CompareRequestDTO getCompareRequest(int Id);
        public Task<CreateRequestEditInfoDto> DenyRequest(int Id, int HRId);
        public Task<CreateRequestEditInfoDto> AcceptRequest(int Id, int HRId);

    }
}
