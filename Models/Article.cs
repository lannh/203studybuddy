using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace senior_project.Models
{
    public class Article
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? id { get; set; }

        public string label { get; set; } = null!;

        public string title { get; set; } = null!;

        public string description { get; set; } = null!;

    }
}
