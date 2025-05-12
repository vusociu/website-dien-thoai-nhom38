using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Threading.Tasks;

namespace WebApp.Middlewares
{
    public class AuthMiddleware : IAsyncActionFilter
    {
        private readonly ILogger<AuthMiddleware> _logger;
        private readonly JwtService _jwtService;

        public AuthMiddleware(ILogger<AuthMiddleware> logger, JwtService jwtService)
        {
            _logger = logger;
            _jwtService = jwtService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;
            var path = httpContext.Request.Path.ToString();
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault();
            _logger.LogInformation("Token: {Token}", token);

            if (token != null && token.StartsWith("Bearer "))
            {
                token = token.Substring("Bearer ".Length);
            }

            if (token == null)
            {
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsync("Unauthorized: Missing or invalid token.");
                return;
            }

            try
            {
                var dataToken = _jwtService.verify(token);

                if (!int.TryParse(dataToken.Issuer, out int userId))
                {
                    httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await httpContext.Response.WriteAsync("Unauthorized: Invalid token claims.");
                    return;
                }
                var roleIdClaim = dataToken.Claims.FirstOrDefault(c => c.Type == "roleId")?.Value;

                if (roleIdClaim == null || !int.TryParse(roleIdClaim, out int roleId))
                {
                    throw new Exception("roleId claim is missing or not a valid integer.");
                }

                httpContext.Items["User"] = userId;
                httpContext.Items["RoleId"] = roleId;
                await next();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Token validation failed");
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsync("Unauthorized: Token validation failed.");
            }
        }
    }
}

