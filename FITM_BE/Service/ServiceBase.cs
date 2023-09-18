using FITM_BE.DependencyInjection;
using FITM_BE.Util;
using NetCore.AutoRegisterDi;

namespace FITM_BE.Service
{
    [RegisterAsTransient]
    public class ServiceBase
    {
        protected readonly IRepository _repository;

        public ServiceBase(IRepository repository)
        {
            _repository = repository;
        }
    }
}
