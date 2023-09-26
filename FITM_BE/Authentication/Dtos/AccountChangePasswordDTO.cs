namespace FITM_BE.Authentication.Dtos
{
    public class AccountChangePasswordDTO
    {
        public int Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
