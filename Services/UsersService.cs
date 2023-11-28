using System;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using senior_project.Models;

namespace senior_project.Services
{
    public class UsersService
    {
        private readonly IMongoCollection<User> _usersCollection;
        private readonly IMongoCollection<UserRoleModel> _userRoleCollection;

        public UsersService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(
                databaseSettings.Value.UsersCollectionName);
            _userRoleCollection = mongoDatabase.GetCollection<UserRoleModel>(
                databaseSettings.Value.UserRoleCollectionName);
        }

        public async Task<List<User>> GetAsync() =>
            await _usersCollection.Find(_ => true).ToListAsync();

        public async Task<User?> GetAsync(string id) =>
            await _usersCollection.Find(x => x.id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateAsync(string id, User updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.id == id, updatedUser);

        public async Task RemoveAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.id == id);

        public async Task<User?> FindByEmailAsync(string email) =>
            await _usersCollection.Find(x => x.email == email).FirstOrDefaultAsync();

        public async Task<User?> FindByUserNameAsync(string username) =>
            await _usersCollection.Find(x => x.userName == username).FirstOrDefaultAsync();

        public async Task<UpdateResult> AddNewSavedArticleAsync(string email, string articleId)
        {
            var filter = Builders<User>.Filter.Eq("email", email);
            var update = Builders<User>.Update.Push("saved-articles",articleId);

            return await _usersCollection.UpdateOneAsync(filter, update);
        }

        public async Task AddNewRoleAsync(UserRoleModel newUserRole) => 
            await _userRoleCollection.InsertOneAsync(newUserRole);

        public async Task<List<UserRoleModel>> GetRolesAsync() =>
            await _userRoleCollection.Find(_ => true).ToListAsync();

        public async Task<List<String>> GetRolesByUserEmailAsync(string email)
        {
            return await _userRoleCollection.Find(x => x.UserEmail == email)
                .Project(x => x.Role).ToListAsync();
        }
    }
}


