namespace FITM_BE.Service.PerformanceScheduleService.Dtos
{
	public class PerformanceCountDTO
	{	
		public int MemberID { get; set; }
		public string StudentID { get; set; }
		public string MemberFullName { get; set; }
		public string? BankName { get; set; }
		public string? BankNumber { get; set; }
		public int TotalPerformance { get; set; }
	}
}
