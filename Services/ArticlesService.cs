using Microsoft.Extensions.Options;
using MongoDB.Driver;
using senior_project.Models;

namespace senior_project.Services
{
    public class ArticlesService
    {
        private readonly IMongoCollection<Article> _articlesCollection;

        public ArticlesService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _articlesCollection = mongoDatabase.GetCollection<Article>(
                databaseSettings.Value.ArticlesCollectionName);
        }

        public async Task<List<Article>> GetAllAsync() =>
            await _articlesCollection.Find(_ => true).ToListAsync();

        public async Task<Article?> GetAsync(string title) =>
            await _articlesCollection.Find(x => x.title == title).FirstOrDefaultAsync();

        public async Task CreateAsync(Article newArticle) =>
            await _articlesCollection.InsertOneAsync(newArticle);

        public async Task UpdateAsync(string title, Article updatedArticle) =>
            await _articlesCollection.ReplaceOneAsync(x => x.title == title, updatedArticle);

        public async Task RemoveAsync(string title) =>
            await _articlesCollection.DeleteOneAsync(x => x.title == title);
    }
}


