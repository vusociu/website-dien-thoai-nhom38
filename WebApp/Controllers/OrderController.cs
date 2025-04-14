using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
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
