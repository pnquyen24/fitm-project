using FITM_BE.Authorization.Permission;

namespace FITM_BE.Authorization.Role
{
    public class RoleDetailDTO : RoleDTO
    {
        public IEnumerable<PermissionDTO> Permissions { get; set; } = new List<PermissionDTO>();
    }
}
