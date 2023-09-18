using FITM_BE.Authorization.Permission;

namespace FITM_BE.Authorization.Role
{
    public interface IRoleService
    {
        public IQueryable<RoleDTO> GetAll();
        public Task<RoleDetailDTO> Get(int id);
        public Task<RoleDetailDTO> Create(RoleDetailDTO newRole);
        public Task<RoleDetailDTO> Update(RoleDTO newRole);
        public Task<RoleDetailDTO> AddPermission(IEnumerable<PermissionDTO> permissions);
        public void Delete(int id);
    }
}
