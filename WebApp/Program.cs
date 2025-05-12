using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using Npgsql;
using WebApp.Repositories;
using WebApp.Middlewares;
using WebApp.helpers;
using Microsoft.Extensions.Options;
using WebApp.Utility;
//using neondb.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin() // Allow all origins
              .AllowAnyHeader() // Allow all headers
              .AllowAnyMethod(); // Allow all methods
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<IRatingRepository, RatingRepository>();
builder.Services.AddScoped<JwtService>();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    //await dbContext.Database.MigrateAsync();
    //await DataHelpers.ManageDataAsync(scope.ServiceProvider);
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

app.Use(async (context, next) =>
{
    context.Items["TimeZone"] = "Asia/Ho_Chi_Minh";
    await next();
});

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors("AllowAllOrigins");
app.UseRouting();
app.UseAuthorization();
//app.UseMiddleware<AuthMiddleware>();
app.MapControllers();
app.Run();
