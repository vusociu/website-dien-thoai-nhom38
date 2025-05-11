using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.DTO.Cart;
using WebApp.Models;
using WebApp.helpers;

namespace WebApp.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IProductRepository _productRepository;

        public CartRepository(ApplicationDbContext context, IProductRepository productRepository)
        {
            _context = context;
            _productRepository = productRepository;
        }

        public List<GetCartItemDto> GetCartByUserId(int userId)
        {
            var cartItems = _context.CartItems
                .Where(c => c.UserId == userId && c.Deleted == SoftDelete.NO_DELETED)
                .ToList();

            var productIds = cartItems.Select(c => c.ProductId).ToArray();
            var products = _productRepository.byIds(productIds);

            return cartItems.Select(item => {
                var product = products.FirstOrDefault(p => p.Id == item.ProductId);
                return new GetCartItemDto
                {
                    Id = item.Id,
                    ProductId = item.ProductId,
                    UserId = item.UserId,
                    Price = item.Price,
                    Num = item.Num,
                    TotalMoney = item.TotalMoney,
                    ProductTitle = product?.Title,
                    ProductThumbnail = product?.Thumbnail
                };
            }).ToList();
        }

        public CartItem AddToCart(int userId, int productId, int quantity)
        {
            // Kiểm tra sản phẩm có tồn tại không
            var product = _productRepository.byId(productId);
            if (product == null)
                return null;

            // Kiểm tra đã có sản phẩm này trong giỏ hàng chưa
            var existingItem = _context.CartItems
                .FirstOrDefault(c => c.UserId == userId && c.ProductId == productId && c.Deleted == SoftDelete.NO_DELETED);

            if (existingItem != null)
            {
                // Cập nhật số lượng nếu đã có
                existingItem.Num += quantity;
                existingItem.TotalMoney = existingItem.Price * existingItem.Num;
                _context.CartItems.Update(existingItem);
                _context.SaveChanges();
                return existingItem;
            }
            else
            {
                // Thêm mới vào giỏ hàng nếu chưa có
                var cartItem = new CartItem
                {
                    UserId = userId,
                    ProductId = productId,
                    Price = product.Price,
                    Num = quantity,
                    TotalMoney = product.Price * quantity,
                    Deleted = SoftDelete.NO_DELETED
                };

                _context.CartItems.Add(cartItem);
                _context.SaveChanges();
                return cartItem;
            }
        }

        public void UpdateCartItem(int cartItemId, int quantity)
        {
            var cartItem = _context.CartItems.Find(cartItemId);
            if (cartItem != null)
            {
                cartItem.Num = quantity;
                cartItem.TotalMoney = cartItem.Price * quantity;
                _context.CartItems.Update(cartItem);
                _context.SaveChanges();
            }
        }

        public void RemoveCartItem(int cartItemId)
        {
            var cartItem = _context.CartItems.Find(cartItemId);
            if (cartItem != null)
            {
                cartItem.Deleted = SoftDelete.DELETED;
                _context.CartItems.Update(cartItem);
                _context.SaveChanges();
            }
        }

        public void ClearCart(int userId)
        {
            var cartItems = _context.CartItems
                .Where(c => c.UserId == userId && c.Deleted == SoftDelete.NO_DELETED)
                .ToList();

            foreach (var item in cartItems)
            {
                item.Deleted = SoftDelete.DELETED;
            }

            _context.CartItems.UpdateRange(cartItems);
            _context.SaveChanges();
        }

        public CartItem GetCartItemById(int cartItemId)
        {
            return _context.CartItems
                .FirstOrDefault(c => c.Id == cartItemId && c.Deleted == SoftDelete.NO_DELETED);
        }

        public List<CartItem> GetCartItemsByUserId(int userId)
        {
            return _context.CartItems
                .Where(c => c.UserId == userId && c.Deleted == SoftDelete.NO_DELETED)
                .ToList();
        }
    }
}
