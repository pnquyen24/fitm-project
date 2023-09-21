using Microsoft.AspNetCore.Mvc;
using FITM_BE.Entity;

[ApiController]
[Route("api/userinfo")]
public class UserInfoController : ControllerBase
{
    private readonly List<Member> users;

    public UserInfoController()
    {
        // Initializing some sample users
        users = new List<Member>
        {
            new Member
            {
                FullName = "Bao Tran",
                Username = "tran",
                Email = "tran@example.com",
                Password = "123",
                StudentID = "QE170086",
                DOB = new DateTime(1990, 1, 15),
                PhoneNumber = "123456789",
                BankName = "BIDV",
                BankNumber = "1234567890",
                Avatar = "link.png",
                Status = true
            },

            new Member
            {
                FullName = "Trung Dung",
                Username = "dung",
                Email = "dung@example.com",
                Password = "456",
                StudentID = "QE170072",
                DOB = new DateTime(1990, 1, 15),
                PhoneNumber = "987654321",
                BankName = "TP Bank",
                BankNumber = "654789351",
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
        var user = users.FirstOrDefault(u => u.Username == username);

        if (user == null)
        {
            // Return a 404 Not Found response if the user is not found
            return NotFound();
        }

        // Return the user information
        return Ok(user);
    }


}