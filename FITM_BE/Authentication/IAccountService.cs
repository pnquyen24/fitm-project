using FITM_BE.Authentication.Dtos;
using FITM_BE.Entity;

namespace FITM_BE.Authentication
{
    public interface IAccountService
    {
        public Task<AcountDTO> GenerateAccount(string fullname);
        public string GeneratePassword(int length, bool isRandom);
        public Task<bool> ForgotPassword(string email);
    }
}
