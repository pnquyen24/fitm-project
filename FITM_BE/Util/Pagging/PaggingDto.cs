using FITM_BE.Enums;
using FITM_BE.Util.Filter;

namespace FITM_BE.Util.Pagging
{
    public class PaggingDto
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int SkipItems { get => (Page - 1) * PageSize; }
        public string? Sort { get; set; }
        public SortDirections? SortDirection { get; set; }
        public List<DynamicFilter>? FilterItems { get; set; }
        public string? SearchText { get; set; }
    }
}
