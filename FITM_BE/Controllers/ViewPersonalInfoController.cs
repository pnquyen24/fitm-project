using FITM_BE.Entity;
using FITM_BE.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace FITM_BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public MembersController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Member>> GetMember(string username)
        {
            var member = await _context.Members.FirstOrDefaultAsync(m => m.Username == username);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }
    }
}