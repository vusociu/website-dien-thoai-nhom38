using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using Npgsql;
//using neondb.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string is missing!");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        dbContext.Database.CanConnect();
        Console.WriteLine("✅ Connect PostgreSQL success!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Connect error: {ex.Message}");
    }
}

app.Run();