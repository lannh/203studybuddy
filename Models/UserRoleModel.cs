using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace senior_project.Models
{
	public class UserRoleModel
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        [BsonElement("userEmail")]
        public required string UserEmail { get; set; }

        [BsonElement("role")]
        public required string Role { get; set; }
	}
}

