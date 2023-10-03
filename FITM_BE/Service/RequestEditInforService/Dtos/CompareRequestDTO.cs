using FITM_BE.Enums;

namespace FITM_BE.Service.RequestEditInforService.Dtos
{
    public class CompareRequestDTO
    {
        public string? OldStudentID { get; set; }
        public DateTime? OldDOB { get; set; }
        public string? OldEmail { get; set; }
        public string? OldPhoneNumber { get; set; }
        public string? OldBankName { get; set; }
        public string? OldBankNumber { get; set; }
        public string? NewStudentID { get; set; }
        public DateTime? NewDOB { get; set; }
        public string? NewEmail { get; set; }
        public string? NewPhoneNumber { get; set; }
        public string? NewBankName { get; set; }
        public string? NewBankNumber { get; set; }
        public RequestEditInfoStatus Status { get; set; }
    }
}
