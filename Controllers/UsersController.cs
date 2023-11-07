using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using senior_project.Models;
using senior_project.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace senior_project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService) =>
            _usersService = usersService;

        [HttpGet, Authorize]
        public string GetAuthorize()
        {
            return "successfully logged in";
        }

       /* [HttpGet]
        public async Task<List<User>> Get() =>
            await _usersService.GetAsync();*/

        [HttpGet("saved-articles"), Authorize]
        public async Task<ActionResult<List<string>>> Get()
        {
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()?.Value;

            if (email is null)
            {
                return BadRequest("Invalid access token");
            }

            var user = await _usersService.FindByEmailAsync(email);

            if (user is null)
            {
                return BadRequest("Invalid access token"); ;
            }

            if (user.savedArticles == null)
                return new List<String>();

            return user.savedArticles;
        }

        [HttpPost("saved-article"), Authorize]
        public async Task<ActionResult<List<string>>> PostSavedArticle(string articleId)
        {
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()?.Value;

            if (email is null)
            {
                return BadRequest("Invalid access token");
            }

            var user = await _usersService.FindByEmailAsync(email);

            if (user is null)
            {
                return BadRequest("Invalid access token"); ;
            }

            return user.savedArticles;
        }

        [HttpPost]
        public async Task<IActionResult> Post(User newUser)
        {
            await _usersService.CreateAsync(newUser);

            return CreatedAtAction(nameof(Get), new { id = newUser.id }, newUser);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, User updatedUser)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            updatedUser.id = user.id;

            await _usersService.UpdateAsync(id, updatedUser);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            await _usersService.RemoveAsync(id);

            return NoContent();
        }
    }
}


