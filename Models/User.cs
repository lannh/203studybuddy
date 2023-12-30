using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace senior_project.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonElement("name")]
        public string userName { get; set; } = null!;

        public string password { get; set; } = null!;

        public string email { get; set; } = null!;

        [BsonElement("saved-articles")]
        public List<String>? savedArticles {get; set;} = null!;
    }
}
