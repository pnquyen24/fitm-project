using AutoMapper;
using FITM_BE.Util;
using NetCore.AutoRegisterDi;

namespace FITM_BE.Service
{
    [RegisterAsTransient]
    public class ServiceBase
    {
        protected readonly IRepository _repository;
        protected readonly IMapper _mapper;

        public ServiceBase(IRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
    }
}
