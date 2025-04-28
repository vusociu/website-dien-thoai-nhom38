using Microsoft.EntityFrameworkCore;
using WebApp.Data;

namespace WebApp.Utility
{
    public class DataHelpers
    {
        public static async Task ManageDataAsync(IServiceProvider svcProvider)
        {
            var dbContextSvc = svcProvider.GetRequiredService<ApplicationDbContext>();
            await dbContextSvc.Database.MigrateAsync();
        }
    }
}
