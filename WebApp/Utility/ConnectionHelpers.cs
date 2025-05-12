﻿using Npgsql;

namespace WebApp.Utility
{
    public class ConnectionHelpers
    {
        public static string GetConnectionString(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            if (string.IsNullOrEmpty(connectionString))
            {
                var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                if (!string.IsNullOrEmpty(databaseUrl))
                {
                    connectionString = BuildConnectionString(databaseUrl);
                }

            }
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException("Not connect");
            }
            return connectionString;
        }

        public static string BuildConnectionString(string databaseUrl)
        {
            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');

            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = databaseUri.Host,
                Port = databaseUri.Port,
                Username = userInfo[0],
                Password= userInfo[1],
                Database = databaseUri.LocalPath.TrimStart('/'),
                SslMode =SslMode.Prefer
            };

            return builder.ToString();
        }
    }

}
