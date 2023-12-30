using System.IdentityModel.Tokens.Jwt;
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using senior_project.Models;
using senior_project.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace senior_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtHandler _jwtHandler;
        private readonly UsersService _usersService;

        public AuthController(UsersService usersService, JwtHandler jwtHandler)
        {
            _usersService = usersService;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userToAuth)
        {
            if (userToAuth is null)
            {
                return BadRequest("Invalid client request");
            }
            //refractoring.guru: java content

            var user = await _usersService.FindByEmailAsync(userToAuth.Email);
            if (user == null || !BCrypt.Net.BCrypt.EnhancedVerify(userToAuth.Password, user.password, HashType.SHA512))
                return Unauthorized();

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = await _jwtHandler.GetClaims(userToAuth);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthenticatedResponse { Token = tokenString });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userToReg)
        {
            if (userToReg is null)
            {
                return BadRequest("Invalid client request");
            }
            if (await _usersService.FindByEmailAsync(userToReg.email) != null)
            {
                return BadRequest("Email already exists.");
            }

            if (await _usersService.FindByUserNameAsync(userToReg.userName) != null)
            {
                return BadRequest("Username already exists.");
            }

            var hashPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(userToReg.password, HashType.SHA512);
            userToReg.password = hashPassword;
            userToReg.savedArticles = new List<string>();


            try
            {
                await _usersService.CreateAsync(userToReg);
                await _usersService.AddNewRoleAsync(
                    new UserRoleModel() {
                        UserEmail = userToReg.email,
                        Role = UserRole.Viewer.ToString()
                    });
            }
            catch
            {
                return BadRequest();
            }

            return StatusCode(201);
        }
    }
    
}

