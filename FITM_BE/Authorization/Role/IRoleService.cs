using FITM_BE.Authorization.Role.Dtos;

namespace FITM_BE.Authorization.Role
{
    public interface IRoleService
    {
        public IQueryable<RoleDTO> GetAll();
        public Task AddRole(AddRoleDTO input);
        public MemberRoleDTO GetRoleMember(int memberId);
    }
}
