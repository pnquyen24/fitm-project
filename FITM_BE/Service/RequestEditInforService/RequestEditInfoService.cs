using FITM_BE.Util;

namespace FITM_BE.Service.RequestEditInforService
{
    public class RequestEditInfoService : ServiceBase,IRequestEditInfoService
    {
        public RequestEditInfoService(IRepository repository) : base(repository)
        {
            
        }
    }
}
