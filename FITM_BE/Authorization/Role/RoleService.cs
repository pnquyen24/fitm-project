using AutoMapper;
using FITM_BE.Authorization.Permission;
using FITM_BE.Service;
using FITM_BE.Util;

namespace FITM_BE.Authorization.Role
{
    public class RoleService : ServiceBase, IRoleService
    {
        private readonly PermissionCollection _permissions;

        public RoleService(IRepository repository, IMapper mapper, PermissionCollection permissions) : base(repository, mapper)
        {
            _permissions = permissions;
        }

        public Task<RoleDetailDTO> AddPermission(IEnumerable<PermissionDTO> permissions)
        {
            throw new NotImplementedException();
        }

        public Task<RoleDetailDTO> Create(RoleDetailDTO newRole)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<RoleDetailDTO> Get(int id)
        {
            var role = await _repository.Get<Role>(id);
            return new RoleDetailDTO
            {
                Name = role.RoleName,
                DisplayName = role.DisplayName,
                Permissions = role.PermissionName.Where(permissionName => _permissions.PermisssionList.Any(permission => permission.FullName == permissionName))
                                                 .Select(permissionName =>
                {
                    var permission = _permissions.PermisssionList.FirstOrDefault(permission => permission.FullName == permissionName);
                    return new PermissionDTO
                    {
                        FullName = permission.FullName,
                        Name = permission.DisplayName
                    };
                })
            };
        }

        public IQueryable<RoleDTO> GetAll()
        {
            return _repository.GetAll<Role>().Select(role => new RoleDTO
            {
                Name = role.RoleName,
                DisplayName = role.DisplayName
            });
        }

        public Task<RoleDetailDTO> Update(RoleDTO newRole)
        {
            throw new NotImplementedException();
        }
    }
}
