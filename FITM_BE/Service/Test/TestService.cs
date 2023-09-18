using FITM_BE.Util;

namespace FITM_BE.Service.Test
{
    public class TestService : ServiceBase, ITestService
    {
        public TestService(IRepository repository) : base(repository)
        {
        }

        public IEnumerable<string> GetAllTest()
        {
            List<string> result = new()
            {
                "a",
                "b",
                "c"
            };

            return result;
        }
    }
}
