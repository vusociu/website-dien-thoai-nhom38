using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using WebApp.Data;

namespace WebApp.Middlewares
{
    public class AdminMiddleware: IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;
            if (httpContext.Items.TryGetValue("RoleId", out var roleIdObj) && roleIdObj is int role)
            {
                if (role != Role.ADMIN)
                {
                    httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await httpContext.Response.WriteAsync("No Permission");
                }
            }
            else
            {
                httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                await httpContext.Response.WriteAsync("No Permission: RoleId missing or invalid.");
            }

            await next();
        }
    }
}
