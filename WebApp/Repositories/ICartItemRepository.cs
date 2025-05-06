using WebApp.Models;

namespace WebApp.Repositories
{
    public interface ICartItemRepository
    {
        CartItem byId(int id);
        List<CartItem> byUserId(int userId);
        CartItem create(CartItem item);
        CartItem update(CartItem item);
        void delete(int id);
    }
}
