using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DTO.Order;
using WebApp.DTO.Cart;
using WebApp.Repositories;
using WebApp.Middlewares;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IProductRepository _productRepository;
        private readonly ICartRepository _cartRepository;

        public OrderController(
            ApplicationDbContext context,
            IOrderRepository orderRepository,
            IOrderDetailRepository orderDetailRepository,
            IProductRepository productRepository,
            ICartRepository cartRepository)
        {
            _context = context;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
            _cartRepository = cartRepository;
        }

        // POST: api/order/checkout
        [TypeFilter(typeof(AuthMiddleware))]
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
        {
            if (request == null || request.CartItems == null || !request.CartItems.Any())
                return BadRequest("Gio hang khong duoc de trong.");

            var userId = request.UserId;
            var productIds = request.CartItems.Select(i => i.ProductId).ToArray();
            var products = _productRepository.byIds(productIds);

            if (products.Count != productIds.Length)
                return BadRequest("Mot hoac nhieu san pham khong ton tai.");

            var productDict = products.ToDictionary(p => p.Id);

            decimal totalMoney = 0;
            foreach (var item in request.CartItems)
            {
                if (productDict.TryGetValue(item.ProductId, out var product))
                {
                    totalMoney += product.Price * item.Quantity;
                }
            }

            var order = new Order
            {
                UserId = request.UserId,
                Fullname = request.Fullname,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                Note = request.Note,
                OrderDate = DateTime.UtcNow,
                Status = 0,
                TotalMoney = (int)totalMoney
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var item in request.CartItems)
            {
                if (productDict.TryGetValue(item.ProductId, out var product))
                {
                    var detail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = item.ProductId,
                        Price = product.Price,
                        Num = item.Quantity,
                        TotalMoney = product.Price * item.Quantity
                    };
                    _context.OrderDetails.Add(detail);
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new CheckoutResponse
            {
                OrderId = order.Id,
                Message = "Dat hang thanh cong!"
            });
        }

        // POST: api/order/checkout-from-cart
        [TypeFilter(typeof(AuthMiddleware))]
        [HttpPost("checkout-from-cart")]
        public async Task<IActionResult> CheckoutFromCart([FromBody] CartCheckoutRequest request)
        {
            if (request == null)
                return BadRequest("Du lieu khong hop le.");

            int userId = request.UserId;

            var cartItems = _cartRepository.GetCartItemsByUserId(userId);
            if (cartItems == null || !cartItems.Any())
                return BadRequest("Gio hang trong.");

            int totalMoney = cartItems.Sum(item => item.TotalMoney);

            var order = new Order
            {
                UserId = request.UserId,
                Fullname = request.Fullname,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                Note = request.Note,
                OrderDate = DateTime.UtcNow,
                Status = 0,
                TotalMoney = totalMoney
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var item in cartItems)
            {
                var detail = new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    Num = item.Num,
                    TotalMoney = item.TotalMoney
                };
                _context.OrderDetails.Add(detail);
            }

            await _context.SaveChangesAsync();

            _cartRepository.ClearCart(userId);

            return Ok(new CheckoutResponse
            {
                OrderId = order.Id,
                Message = "Dat hang thanh cong!"
            });
        }

        [TypeFilter(typeof(AuthMiddleware))]
        [HttpGet("{id}/detail")]
        public IActionResult GetOrderDetails([FromRoute] int id)
        {
            Order order = _orderRepository.byId(id);
            if (order == null)
                return NotFound($"Khong tim thay don hang voi ID {id}");

            List<OrderDetail> orderDetails = _orderDetailRepository.byOrderIds(new int[] { order.Id });
            if (orderDetails == null || !orderDetails.Any())
                return NotFound($"Khong tim thay chi tiet don hang cho don hang ID {id}");

            int[] productIds = orderDetails.Select(od => od.ProductId).ToArray();
            List<Product> products = _productRepository.byIds(productIds);
            var productDict = products.ToDictionary(p => p.Id);

            var orderDetailsDto = orderDetails.Select(od => {
                productDict.TryGetValue(od.ProductId, out var product);
                return new OrderDetailDto
                {
                    OrderId = od.OrderId,
                    ProductId = od.ProductId,
                    Price = od.Price,
                    Num = od.Num,
                    TotalMoney = od.TotalMoney,
                    ProductTitle = product?.Title,
                    ProductThumbnail = product?.Thumbnail
                };
            }).ToList();

            var orderWithDetails = new OrderWithDetailsDto
            {
                Id = order.Id,
                UserId = order.UserId,
                Fullname = order.Fullname,
                Email = order.Email,
                PhoneNumber = order.PhoneNumber,
                Address = order.Address,
                Note = order.Note,
                OrderDate = order.OrderDate,
                Status = order.Status,
                TotalMoney = order.TotalMoney,
                OrderDetails = orderDetailsDto
            };

            return Ok(orderWithDetails);
        }
    }
}
