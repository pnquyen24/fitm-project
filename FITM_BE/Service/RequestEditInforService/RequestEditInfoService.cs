using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.RequestEditInforService.Dtos;
using FITM_BE.Util;

namespace FITM_BE.Service.RequestEditInforService
{
    public class RequestEditInfoService : ServiceBase, IRequestEditInfoService
    {

        public RequestEditInfoService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {

        }

        public async Task<RequestEditInfo> Create(RequestEditInfoDto requestEditInfoDto)
        {
            RequestEditInfo requestEditInfo = _mapper.Map<RequestEditInfo>(requestEditInfoDto);
            requestEditInfo.Status = Enums.RequestEditInfoStatus.Pending;
            await _repository.Add(requestEditInfo);
            return requestEditInfo;
        }

        public IQueryable<CreateRequestEditInfoDto> getAllRequestEditInfo()
        {
            IQueryable<CreateRequestEditInfoDto> requestEditInfoDtos =
                 _repository.GetAll<RequestEditInfo>().Select(request => _mapper.Map<CreateRequestEditInfoDto>(request));
            //if (requestEditInfoDtos.Any()) return requestEditInfoDtos;
            //else throw new NotFoundException("The list is empty");
            return requestEditInfoDtos;
        }

    }
}
