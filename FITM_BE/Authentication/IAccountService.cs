using FITM_BE.Authentication.Dtos;
using FITM_BE.Entity;

namespace FITM_BE.Authentication
{
    public interface IAccountService
    {
        public void GenerateAccount(ref Member member, out string newPassword);
        public string GeneratePassword(int length, bool isRandom);
        public Task<string> Login(LoginDto login);
        public Task ForgotPassword(string email);
        public Task<string> ChangePassword(AccountChangePasswordDTO accountChangePasswordDTO);
    }
}
