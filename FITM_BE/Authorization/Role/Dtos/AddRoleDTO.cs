namespace FITM_BE.Authorization.Role.Dtos
{
    public class AddRoleDTO
    {
        public int UserId
        {
            get; set;
        }
        public ICollection<int> RoleIds { get; set; } = new List<int>();
    }
}
