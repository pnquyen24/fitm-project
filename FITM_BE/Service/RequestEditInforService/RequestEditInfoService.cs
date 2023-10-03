using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.MemberService.Dtos;
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
                 _repository.GetAll<RequestEditInfo>().Select(request => new CreateRequestEditInfoDto
                 {
                     Id = request.Id,
                     BankName = request.BankName,
                     DOB = request.DOB,
                     BankNumber = request.BankNumber,
                     Email = request.Email,
                     PhoneNumber = request.PhoneNumber,
                     StudentID = request.StudentID,
                     Status = request.Status,
                     CreatedBy = request.CreatedBy.Username ?? ""
                 });
            return requestEditInfoDtos;
        }

        public CompareRequestDTO getCompareRequest(int requestId, string username)
        {
            var changeRequestEditInfoDto = _repository.GetAll<RequestEditInfo>().
                FirstOrDefault(request => request.Id == requestId);

            var oldProfile = _mapper.Map<ProfileDto>( _repository.GetAll<Member>().
                FirstOrDefault(member => member.Username == username));

            CompareRequestDTO compareRequestDTO = new ()
            {
                NewStudentID = changeRequestEditInfoDto.StudentID,
                NewBankName = changeRequestEditInfoDto.BankName,
                NewDOB = changeRequestEditInfoDto.DOB,
                NewEmail = changeRequestEditInfoDto.Email,
                NewBankNumber = changeRequestEditInfoDto.BankNumber,
                NewPhoneNumber = changeRequestEditInfoDto.PhoneNumber,
                OldBankName = oldProfile.BankName,
                OldDOB = oldProfile.DOB,
                OldEmail = oldProfile.Email, 
                OldBankNumber = oldProfile.BankNumber,
                OldPhoneNumber = oldProfile.PhoneNumber,
                OldStudentID = oldProfile.StudentID,
                Status = changeRequestEditInfoDto.Status
            };

            return compareRequestDTO;
    }
}
}
