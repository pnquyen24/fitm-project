using FITM_BE.Service.Test;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Controllers
{
    public class TestController : ApiBase
    {
        private readonly ITestService testService;

        public TestController(ITestService testService)
        {
            this.testService = testService;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            testService.GetAllTest();
            return testService.GetAllTest();
        }
    }
}
