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

        public  RequestEditInfo Create(RequestEditInfoDto requestEditInfoDto)
        {
            RequestEditInfo requestEditInfo = new()
            {
                BankName = requestEditInfoDto.BankName,
                BankNumber = requestEditInfoDto.BankNumber,
                DOB = requestEditInfoDto.DOB,
                StudentID = requestEditInfoDto.StudentID,
                Email = requestEditInfoDto.Email    ,
                PhoneNumber  = requestEditInfoDto.PhoneNumber,
                Status = Enums.RequestEditInfoStatus.Pending     
            } ;
             _repository.Add(requestEditInfo);
            return  requestEditInfo;
        }

        public List<RequestEditInfoDto> getAllRequestEditInfo()
        {
           List<RequestEditInfoDto> requestEditInfoDtos =
                _repository.GetAll<RequestEditInfo>().Select(request => new RequestEditInfoDto()
                {
                    BankName = request.BankName,
                    BankNumber = request.BankNumber,
                    DOB = request.DOB,
                    StudentID = request.StudentID,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                }).ToList();
            if (requestEditInfoDtos.Any()) return requestEditInfoDtos;
            else throw new NotFoundException("The list is empty");
        }

    }
}
