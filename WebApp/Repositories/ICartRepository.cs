using System.Collections.Generic;
using WebApp.DTO.Cart;
using WebApp.Models;

namespace WebApp.Repositories
{
    public interface ICartRepository
    {
        List<GetCartItemDto> GetCartByUserId(int userId);
        CartItem AddToCart(int userId, int productId, int quantity);
        void UpdateCartItem(int cartItemId, int quantity);
        void RemoveCartItem(int cartItemId);
        void ClearCart(int userId);
        CartItem GetCartItemById(int cartItemId);
        List<CartItem> GetCartItemsByUserId(int userId);
    }
}
