using System.Text.RegularExpressions;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class CartItemRepository : ICartItemRepository
    {
        ApplicationDbContext _context;
        public CartItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public CartItem byId(int id)
        {
            return _context.CartItems.FirstOrDefault(u => u.Id == id && u.Deleted == SoftDelete.NO_DELETED);
        }

        public List<CartItem> byUserId(int userId)
        {
            return _context.CartItems.Where(u => u.UserId == userId && u.Deleted == SoftDelete.NO_DELETED).ToList();
        }

        public CartItem create(CartItem item)
        {
            _context.CartItems.Add(item);
            item.Id = _context.SaveChanges();
            return item;
        }

        public void delete(int id)
        {
            var cartItem = _context.CartItems.FirstOrDefault(u => u.Id == id && u.Deleted == SoftDelete.NO_DELETED);
            if (cartItem != null)
            {
                cartItem.Deleted = SoftDelete.DELETED;
                _context.SaveChanges();
            }
        }

        public CartItem update(CartItem item)
        {
            return _context.CartItems.Update(item).Entity;
        }
    }
}
