using System;
namespace senior_project.Models
{
    public class DatabaseSettings
    {
        public required string ConnectionString { get; set; }

        public required string DatabaseName { get; set; }

        public required string UsersCollectionName { get; set; }

        public required string UserRoleCollectionName { get; set; } 

        public required string ArticlesCollectionName { get; set; }

    }
}

