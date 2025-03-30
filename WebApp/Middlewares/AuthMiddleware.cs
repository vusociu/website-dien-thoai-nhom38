using System;
using System.Threading.Tasks;

namespace WebApp.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuthMiddleware> _logger;

        public AuthMiddleware(RequestDelegate next, ILogger<AuthMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.ToString();
            if (path.Contains("/login", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }
            var token = context.Request.Headers["Authorization"].FirstOrDefault();
            _logger.LogInformation(token);
            if (token != null && token.StartsWith("Bearer "))
            {
                token = token.Substring("Bearer ".Length);
            }
            if (token == null)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized: Missing or invalid token.");
                return;
            }
            try
            {
                var jwtService = context.RequestServices.GetRequiredService<JwtService>();
                var dataToken = jwtService.verify(token);
                var userId = int.Parse(dataToken.Issuer);
                if (!int.TryParse(dataToken.Issuer, out userId))
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized: Invalid token claims.");
                    return;
                }
                context.Items["User"] = userId;
                await _next(context);
            }
            catch
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized: Token validation failed.");
            }
        }
    }
}

