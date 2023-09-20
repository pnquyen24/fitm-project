using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.RequestEditInforService.Dtos;
using FITM_BE.Util;
using NuGet.Protocol.Core.Types;

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
            return  requestEditInfo;
        }

        public List<CreateByRequestEditInfoDto> getAllRequestEditInfo()
        {
           List<CreateByRequestEditInfoDto> requestEditInfoDtos =
                _repository.GetAll<RequestEditInfo>().Select(request => _mapper.Map<CreateByRequestEditInfoDto>(request)).ToList();
            if (requestEditInfoDtos.Any()) return requestEditInfoDtos;
            else throw new NotFoundException("The list is empty");
        }

    }
}
