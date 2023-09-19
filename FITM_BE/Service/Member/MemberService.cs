using FITM_BE.Util;

namespace FITM_BE.Service.Member
{
    public class MemberService : ServiceBase, IMemberService
    {
        public MemberService(IRepository repository) : base(repository)
        {
        }
    }
}
