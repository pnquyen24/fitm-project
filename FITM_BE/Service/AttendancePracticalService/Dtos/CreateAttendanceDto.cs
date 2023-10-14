namespace FITM_BE.Service.AttendancePracticalService.Dtos
{
    public class CreateAttendanceDto
    {
        public int ScheduleId { get; set; }
        public string StudentId { get; set; }
        public string FullName { get; set; }
    }
}
