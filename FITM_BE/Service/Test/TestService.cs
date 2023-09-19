using AutoMapper;
using FITM_BE.Entity;
using FITM_BE.Util;

namespace FITM_BE.Service.Test
{
    public class TestService : ServiceBase, ITestService
    {

        public TestService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public IEnumerable<string> GetAllTest()
        {
            throw new NotImplementedException();
        }
    }
}
