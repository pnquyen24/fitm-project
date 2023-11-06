using FITM_BE.Authorization.Role.Dtos;
using FITM_BE.Authorization.Utils;
using FITM_BE.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace FITM_BE.Authorization.Role
{
    [Policy(nameof(RoleController))]
    public class RoleController : ApiBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public IEnumerable<RoleDTO> GetAll()
        {
            return _roleService.GetAll();
        }

        [HttpGet]
        public MemberRoleDTO Get(int id)
        {
            return _roleService.GetRoleMember(id);
        }

        [HttpPost]
        public async Task AddRole(AddRoleDTO input)
        {
            await _roleService.AddRole(input);
        }
    }
}
