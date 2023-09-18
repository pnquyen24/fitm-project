using NetCore.AutoRegisterDi;

namespace FITM_BE.Authorization.Permission
{
    public class PermissionCollection
    {
        public IEnumerable<Permission> PermissionTree = new List<Permission>
        {
            new (PermissionNames.Configuration)
            {
                SubPermissions = new List<Permission>
                {
                    new (PermissionNames.Role)
                    {
                        SubPermissions = PermissionNames.GetAllAction()
                                                        .Select(action => new Permission(action))
                    },
                    new(PermissionNames.Permission)
                    {
                        SubPermissions = PermissionNames.GetAllAction()
                                                        .Select(action => new Permission(action))
                    }
                }
            }
        };
        public IEnumerable<Permission> PermisssionList;
        public PermissionCollection()
        {
            foreach (var permission in PermissionTree)
            {
                GetPemisstionFullName(permission, "");
            }
            PermisssionList = SetPermissionList(PermissionTree.ToList());
        }

        private List<Permission> SetPermissionList(List<Permission> permissions)
        {
            foreach (var permission in permissions)
            {
                if (permission.SubPermissions != null || !permission.SubPermissions.Any())
                {
                    permissions.AddRange(permission.SubPermissions);
                    permission.SubPermissions = null;
                }
            }
            return permissions;
        }

        public IEnumerable<string> GetAllFullName()
        {
            return PermissionTree.SelectMany(permission =>
            {
                GetAllFullName(permission, out IEnumerable<string> permissions);
                return permissions;
            });
        }

        private void GetAllFullName(Permission permission, out IEnumerable<string> permissions)
        {
            var result = new List<string>()
            {
                permission.FullName
            };
            if (!permission.SubPermissions?.Any() ?? false)
            {
                result.AddRange(permission.SubPermissions.SelectMany(permission =>
                {
                    GetAllFullName(permission, out IEnumerable<string> permissions);
                    return permissions;
                }));
            }
            permissions = result;
        }

        private void GetPemisstionFullName(Permission permission, string parentName)
        {
            permission.FullName = $"{parentName}.{permission.DisplayName}";
            if (permission.SubPermissions != null && permission.SubPermissions.Any())
            {
                foreach (var subPermission in permission.SubPermissions)
                {
                    GetPemisstionFullName(subPermission, permission.FullName);
                }
            }
        }
    }
}
