using AutoMapper;
using FITM_BE.Authorization.Role.Dtos;
using FITM_BE.Entity;
using FITM_BE.Exceptions.UserException;
using FITM_BE.Service;
using FITM_BE.Util;
using FITM_BE.Util.Pagging;
using Microsoft.EntityFrameworkCore;
using NetCore.AutoRegisterDi;

namespace FITM_BE.Authorization.Role
{
    [RegisterAsTransient]
    public class RoleService : ServiceBase, IRoleService
    {
        public RoleService(IRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        public async Task AddRole(AddRoleDTO input)
        {
            var member = await _repository.GetAll<Member>()
                .Include(member => member.Roles)
                .FirstOrDefaultAsync(member => member.Id == input.UserId)
                ?? throw new NotFoundException("Member not found");
            var roles = _repository.GetAll<Role>()
                .Where(role => input.RoleIds.Contains(role.Id));
            member.Roles = roles.ToList();
            await _repository.Update(member);
        }

        public IQueryable<RoleDTO> GetAll()
        {
            return _repository.GetAll<Role>().Select(role => new RoleDTO
            {
                Id = role.Id,
                Name = role.RoleName,
            });
        }

        public MemberRoleDTO GetRoleMember(int memberId)
        {
            var query = _repository.GetAll<Member>()
                .Include(_member => _member.Roles)
                .FirstOrDefault(member => member.Id == memberId) ?? throw new NotFoundException("Member not found");
            return new MemberRoleDTO
            {
                Id = query.Id,
                Name = query.FullName,
                Username = query.Username,
                Roles = query.Roles.Select(role => new RoleDTO
                {
                    Id = role.Id,
                    Name = role.RoleName
                })
            };
        }
    }
}
