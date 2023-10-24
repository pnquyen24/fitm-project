using AutoMapper;
using FITM_BE.Util;

namespace FITM_BE.Service.PerformanceMemberService
{
    public class PerformanceMemberService : ServiceBase, IPerformanceMemberService
    {
        public PerformanceMemberService(IRepository repository, IMapper mapper) : base(repository, mapper){}


    }
}
