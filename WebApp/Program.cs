using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using Npgsql;
using WebApp.Repositories;
using WebApp.Middlewares;
//using neondb.Data;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers();

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<JwtService>();
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


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.UseMiddleware<AuthMiddleware>();
app.MapControllers();
app.Run();