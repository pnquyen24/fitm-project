namespace FITM_BE.Authorization.Permission
{
    public class Permission
    {
        public string DisplayName { get; init; }
        public IEnumerable<Permission>? SubPermissions { get; set; }
        public string FullName { get; set; } = string.Empty;

        public Permission(string displayName)
        {
            DisplayName = displayName;
        }

        public static string GetFullName(params string[] permissions)
        {
            return string.Join(".", permissions);
        }
    }
}
