using Microsoft.AspNetCore.Mvc;
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

    }
}


