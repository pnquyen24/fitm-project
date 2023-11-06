namespace FITM_BE.Authorization.Role.Dtos
{
    public class MemberRoleDTO
    {
        public int Id
        {
            get; set;
        }
        public string Name
        {
            get; set;
        }
        public string Username
        {
            get; set;
        }
        public IEnumerable<RoleDTO> Roles
        {
            get; set;
        }
    }
}
