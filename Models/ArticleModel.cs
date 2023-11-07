using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace senior_project.Models
{
    public class ArticleModel
    {
        public string label { get; set; } = null!;

        public string title { get; set; } = null!;

        public string description { get; set; } = null!;
    }
}
