using Microsoft.AspNetCore.Mvc;
using ViewPersonalProfile.Models;

[ApiController]
[Route("api/userinfo")]
public class UserInfoController : ControllerBase
{
    private readonly List<UserInfo> users;

    public UserInfoController()
    {
        // Initializing some sample users
        users = new List<UserInfo>
        {
            new UserInfo
            {
                FullName = "Bao Tran",
                UserName = "tran",
                Email = "tran@example.com",
                Password = "123",
                StudentID = "QE170086",
                BirthDate = new DateTime(1990, 1, 15),
                PhoneNumber = "123456789",
                BankName = "Example Bank",
                BankAccountNumber = "1234567890",
                Avatar = "link.png",
                Status = true
            }            
        };
    }

    [HttpGet]
    public IActionResult GetUserInfo()
    {
        // Retrieve all users
        return Ok(users);
    }


    [HttpGet("{username}")]
    public IActionResult GetUserInfoByUsername(string username)
    {
        // Find the user with the specified username
        var user = users.FirstOrDefault(u => u.UserName == username);

        if (user == null)
        {
            // Return a 404 Not Found response if the user is not found
            return NotFound();
        }

        // Return the user information
        return Ok(user);
    }


}