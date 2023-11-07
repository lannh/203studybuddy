using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
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
    public class ArticlesController : ControllerBase
    {
        private readonly ArticlesService _articlesService;

        public ArticlesController(ArticlesService articlesService) =>
            _articlesService = articlesService;

        [HttpPost("article/submit"), Authorize]
        public async Task<IActionResult> SubmitArticle([FromBody] Article article)
        {
            if (article is null)
            {
                return BadRequest("Invalid client request");
            }


            try
            {
                await _articlesService.CreateAsync(article);
            }
            catch
            {
                return BadRequest();
            }

            return StatusCode(201);
        }

        





        [HttpGet("all")]
        public async Task<List<Article>> GetAllArticles() =>
           await _articlesService.GetAllAsync();

        [HttpGet("articles/find")]
        public async Task<ActionResult<Article>> Get([FromBody] string title)
        {
            var article = await _articlesService.GetAsync(title);

            if (article is null)
            {
                return NotFound();
            }

            return article;
        }


        [HttpPut("article/edit/{title}")]
        public async Task<IActionResult> Update(string title, [FromBody] Article updatedArticle)
        {
            var article = await _articlesService.GetAsync(title);

            if (article is null)
            {
                return NotFound();
            }

            await _articlesService.UpdateAsync(title, updatedArticle);

            return NoContent();
        }

        [HttpDelete("article/delete")]
        public async Task<IActionResult> Delete([FromBody] string title)
        {
            var article = await _articlesService.GetAsync(title);

            if (article is null)
            {
                return NotFound();
            }

            await _articlesService.RemoveAsync(title);

            return NoContent();
        }
    }
}


