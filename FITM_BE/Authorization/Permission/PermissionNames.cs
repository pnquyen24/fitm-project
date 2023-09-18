namespace FITM_BE.Authorization.Permission
{
    public class PermissionNames
    {
        #region Page
        public const string Configuration = "Configuration";
        #region Configuration's tab
        public const string Role = "Role";
        public const string Permission = "Permission";
        #endregion
        #endregion
        #region Action
        public const string ViewAll = "ViewAll";
        public const string ViewDetail = "ViewDetail";
        public const string Edit = "Edit";
        public const string Delete = "Delete";
        public const string Create = "Create";
        public const string Add = "Add";
        #endregion

        public static IEnumerable<string> GetAllAction()
        {
            return new string[]
            {
                ViewAll,
                ViewDetail,
                Edit,
                Delete,
                Create,
                Add
            };
        }
    }
}
