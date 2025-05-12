using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApp.DTO.Cart;
using WebApp.Middlewares;
using WebApp.Repositories;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(AuthMiddleware))]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        // GET: api/Cart/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetCartByUserId(int userId)
        {
            var cartItems = _cartRepository.GetCartByUserId(userId);
            return Ok(cartItems);
        }

        // POST: api/Cart/add
        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] AddToCartRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request data");

            var cartItem = _cartRepository.AddToCart(request.UserId, request.ProductId, request.Quantity);
            if (cartItem == null)
                return NotFound("Product not found");

            return Ok(new { message = "San pham da duoc them vao gio hang", cartItemId = cartItem.Id });
        }

        // PUT: api/Cart/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateCartItem(int id, [FromBody] UpdateCartItemRequest request)
        {
            var cartItem = _cartRepository.GetCartItemById(id);
            if (cartItem == null)
                return NotFound($"Cart item with ID {id} not found");

            _cartRepository.UpdateCartItem(id, request.Quantity);
            return Ok(new { message = "Cap nhat gio hang thanh cong" });
        }

        // DELETE: api/Cart/{id}
        [HttpDelete("{id}")]
        public IActionResult RemoveCartItem(int id)
        {
            var cartItem = _cartRepository.GetCartItemById(id);
            if (cartItem == null)
                return NotFound($"Cart item with ID {id} not found");

            _cartRepository.RemoveCartItem(id);
            return Ok(new { message = "Da xoa san pham khoi gio hang" });
        }

        // DELETE: api/Cart/clear/{userId}
        [HttpDelete("clear/{userId}")]
        public IActionResult ClearCart(int userId)
        {
            _cartRepository.ClearCart(userId);
            return Ok(new { message = "Da xoa toan bo gio hang" });
        }
    }
}
