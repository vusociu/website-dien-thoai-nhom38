using WebApp.Models;

namespace WebApp.Repositories
{
    public interface IOrderRepository
    {
        List<Order> byUserId(int userId);
        Order byId(int id);
    }
}
