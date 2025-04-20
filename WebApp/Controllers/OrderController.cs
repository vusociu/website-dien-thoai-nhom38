using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.DTO.User;
using WebApp.Transform;
using WebApp.Repositories;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private IOrderRepository _orderRepository;
        private IOrderDetailRepository _orderDetailRepository;

        public OrderController(ApplicationDbContext context, IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository)
        {
            _context = context;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
        }

        // POST: api/order/checkout
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
        {
            if (request == null || request.CartItems == null || !request.CartItems.Any())
                return BadRequest("Gio hang khong duoc de trong.");

            var order = new Order
            {
                UserId = request.UserId,
                Fullname = request.Fullname,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                Note = request.Note,
                OrderDate = DateTime.Now,
                Status = 0,
                TotalMoney = request.CartItems.Sum(i => i.Price * i.Quantity)
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var item in request.CartItems)
            {
                var detail = new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Price = item.Price,
                    Num = item.Quantity,
                    TotalMoney = item.Price * item.Quantity
                };
                _context.OrderDetails.Add(detail);
            }

            await _context.SaveChangesAsync();
            return Ok(new { orderId = order.Id, message = "Dat hang thanh cong!" });
        }

        [HttpGet("/{id}/detail")]
        public async Task<IActionResult> listOrder([FromRoute] int id)
        {
            Order order = _orderRepository.byId(id);
            OrderDetail orderDetails = _orderDetailRepository.byOrderId(order.Id);
            return Ok(new OrderWithDetailTransform
            {
                order = order,
                orderDetail = orderDetails
            });
        }
    }

    // Request DTO
    public class CheckoutRequest
    {
        public int UserId { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public List<CartItemDto> CartItems { get; set; }
    }

    public class CartItemDto
    {
        public int ProductId { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
