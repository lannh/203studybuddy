using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senior_project.Models;
using senior_project.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace senior_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UsersService _usersService;

        public AuthController(UsersService usersService) =>
            _usersService = usersService;

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

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "https://localhost:5001",
                    audience: "https://localhost:5001",
                    claims: new List<Claim> { new Claim(ClaimTypes.Email, userToAuth.Email) }, //can be used for roles
                    expires: DateTime.Now.AddYears(5),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

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


            try
            {
                await _usersService.CreateAsync(userToReg);
            }
            catch
            {
                return BadRequest();
            }

            return StatusCode(201);
        }
    }
    
}

