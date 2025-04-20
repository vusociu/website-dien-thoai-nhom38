using WebApp.Data;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Order byId(int id)
        {
            return _context.Orders.FirstOrDefault(u => u.Id == id);
        }

        public List<Order> byUserId(int userId)
        {
            return _context.Orders.Where(u => u.UserId == userId && u.Deleted == SoftDelete.NO_DELETED)
                .OrderBy(u => u.OrderDate)
                .ToList();
        }
    }
}
