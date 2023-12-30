using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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

        [HttpPut, Authorize]
        [Route("saved-articles")]
        public async Task<ActionResult<long>> AddSavedArticle([FromBody] Article article)
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

            var res = await _usersService.AddNewSavedArticleAsync(user.email, article.id);
            return res.ModifiedCount;
        }

    }
}


