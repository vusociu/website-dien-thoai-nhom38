using WebApp.Models;

namespace WebApp.Repositories
{
    public interface IOrderDetailRepository
    {
        List<OrderDetail> byOrderIds(int[] orderIds);
        OrderDetail byOrderId(int orderId);
    }
}
