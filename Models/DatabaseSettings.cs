using System;
namespace senior_project.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string UsersCollectionName { get; set; } = null!;

        public string ArticlesCollectionName { get; set; } = null!;

    }
}

