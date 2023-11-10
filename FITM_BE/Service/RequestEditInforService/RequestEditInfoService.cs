using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.EntityFrameworkCore;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service.EmailService;
using FITM_BE.Service.MemberService.Dtos;
using FITM_BE.Service.RequestEditInforService.Dtos;
using FITM_BE.Util;
using Microsoft.EntityFrameworkCore;

namespace FITM_BE.Service.RequestEditInforService
{
    public class RequestEditInfoService : ServiceBase, IRequestEditInfoService
    {

        private readonly IEmailSender _emailSender;
   
        public RequestEditInfoService(IRepository repository, IMapper mapper, IEmailSender emailSender) : base(repository, mapper)
        {
            _emailSender = emailSender;
        }

        public async Task<RequestEditInfo> Create(RequestEditInfoDto requestEditInfoDto)
        {
            RequestEditInfo requestEditInfo = _mapper.Map<RequestEditInfo>(requestEditInfoDto);
            requestEditInfo.Status = Enums.RequestEditInfoStatus.Pending;
            var existRequest = _repository.GetAll<RequestEditInfo>()
                .Where(rq => rq.CreatedById == requestEditInfo.CreatedById);

            if (existRequest.Any(rq=> rq.Status.Equals(Enums.RequestEditInfoStatus.Pending))) {
                throw new InvalidException("One member can only send one pending request pertime"); }
            else
            await _repository.Add(requestEditInfo);
            return requestEditInfo;
        }

        public IQueryable<CreateRequestEditInfoDto> getAllRequestEditInfo()
        {
            IQueryable<CreateRequestEditInfoDto> requestEditInfoDtos =
                 _repository.GetAll<RequestEditInfo>()
                 .OrderBy(x => x.Status)
                 .ThenByDescending(request => request.CreatedTime)
                 .Select(request => new CreateRequestEditInfoDto
                 {
                     Id = request.Id,
                     BankName = request.BankName,
                     DOB = request.DOB,
                     BankNumber = request.BankNumber,
                     CreatedTime = request.CreatedTime,
                     Email = request.Email,
                     PhoneNumber = request.PhoneNumber,
                     StudentID = request.StudentID,
                     Status = request.Status,
                     CreatedBy = request.CreatedBy.Username ?? ""
                 });
            return requestEditInfoDtos;
        }

        public CompareRequestDTO getCompareRequest(int Id)
        {
            var requestEditInfo = _repository.GetAll<RequestEditInfo>().
                FirstOrDefault(request => request.Id == Id);

            var oldProfile = _mapper.Map<ProfileDto>(_repository.GetAll<Member>().
                FirstOrDefault(member => member.Id == requestEditInfo.CreatedById));

            CompareRequestDTO compareRequestDTO = new()
            {
                NewStudentID = requestEditInfo.StudentID,
                NewBankName = requestEditInfo.BankName,
                NewDOB = requestEditInfo.DOB,
                NewEmail = requestEditInfo.Email,
                NewBankNumber = requestEditInfo.BankNumber,
                NewPhoneNumber = requestEditInfo.PhoneNumber,
                CreatedTime = (DateTime)requestEditInfo.CreatedTime ,
                OldBankName = oldProfile.BankName,
                OldDOB = oldProfile.DOB,
                OldEmail = oldProfile.Email,
                OldBankNumber = oldProfile.BankNumber,
                OldPhoneNumber = oldProfile.PhoneNumber,
                OldStudentID = oldProfile.StudentID,
                Status = requestEditInfo.Status
            };

            return compareRequestDTO;
        }

        public async Task<CreateRequestEditInfoDto> DenyRequest(int requestId, string HRUsername)
        {
            var requestEditInfo = _repository.GetAll<RequestEditInfo>().
                First(request => request.Id == requestId);

            var member = _mapper.Map<ProfileDto>(_repository.GetAll<Member>().
                FirstOrDefault(member => member.Id == requestEditInfo.CreatedById));

            requestEditInfo.Status = (Enums.RequestEditInfoStatus)2;
            await _repository.Update(requestEditInfo);

            await SendEmail(member.Email,HRUsername,2);

            var createRequestEditInfo = _mapper.Map<CreateRequestEditInfoDto>(requestEditInfo);

            return createRequestEditInfo;
        }

        public async Task<CreateRequestEditInfoDto> AcceptRequest(int requestId, string HRUsername)
        {
            var requestEditInfo =await _repository.GetAll<RequestEditInfo>().
                FirstAsync(request => request.Id == requestId);

            var member = await _repository.GetAll<Member>().
                FirstAsync(member => member.Id == requestEditInfo.CreatedById);
            
            if (( await CheckExistEmail(requestEditInfo.Email)!=null) && (member.Email != requestEditInfo.Email) )
             throw new InvalidException("Email has been exist");

            //update infomation
            await _repository.Update(UpdateMember(member,requestEditInfo));

            requestEditInfo.Status = (Enums.RequestEditInfoStatus)1;
            await _repository.Update(requestEditInfo);

            await SendEmail(member.Email,HRUsername , 1);

            var createRequestEditInfo = _mapper.Map<CreateRequestEditInfoDto>(requestEditInfo);

            return createRequestEditInfo;
        }

        private Member UpdateMember(Member member, RequestEditInfo requestEditInfo)
        {
            member.StudentID = requestEditInfo.StudentID;
            member.BankNumber = requestEditInfo.BankNumber;
            member.BankName = requestEditInfo.BankName;
            member.DOB = (DateTime)(requestEditInfo.DOB is null ? member.DOB : requestEditInfo.DOB);
            member.PhoneNumber = requestEditInfo.PhoneNumber;
            member.Email = requestEditInfo.Email is null ? member.Email : requestEditInfo.Email;

            return member;
        }

        private async Task<Member?> CheckExistEmail(string email)
        {
            Member? member = await _repository
                                .GetAll<Member>()
                                .FirstOrDefaultAsync(m => m.Email.Equals(email));
            return member;
        }
        private async Task SendEmail(string email, string username, int status)
        {
            Message message ;

            if (status == 2)
            {
                message = new Message
                (
               new string[]
                    { email },
                    "FITM Human resources informs: denied",
                    "From FITM Human resouces"
                    + "<p>Your request to change account's information has been denied</p>"
                    + "<p>By " + username + ". </p>"
                );
            }
            else
            {
                message = new Message
                 (
                new string[]
                     { email },
                     "FITM Human resources informs: Accept",
                     "<p>From FITM Muman resouces </p>"
                     + "<p>Your request to change account's information has been accepted</p>"
                     + "<p>By " + username + ". </p>"
                 );
            }
            await _emailSender.SendEmailAsync(message);
        }
    }
}
