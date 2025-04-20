using WebApp.Data;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class OrderDetailRepository : IOrderDetailRepository
    {

        private ApplicationDbContext _context;
        public OrderDetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public OrderDetail byOrderId(int orderId)
        {
            return _context.OrderDetails.FirstOrDefault(u => u.OrderId == orderId);
        }

        public List<OrderDetail> byOrderIds(int[] orderIds)
        {
            return _context.OrderDetails.Where(u => orderIds.Contains(u.OrderId)).ToList();
        }
    }
}
