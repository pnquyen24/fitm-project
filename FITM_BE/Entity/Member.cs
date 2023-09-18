using FITM_BE.Entity.Core;

namespace FITM_BE.Entity
{
    public class Member : Entity<int>
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
