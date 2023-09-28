namespace FITM_BE.Util.Pagging
{
    public class PaggingResultDto<T> where T : class
    {
        public int Total { get; set; }
        public List<T> Results { get; set; }

        public PaggingResultDto(List<T> results, int total)
        {
            Total = total;
            Results = results;
        }
    }
}
