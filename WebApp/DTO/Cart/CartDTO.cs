using System.Collections.Generic;

namespace WebApp.DTO.Cart
{
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartCheckoutRequest
    {
        public int UserId { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
    }

    public class GetCartItemDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Price { get; set; }
        public int Num { get; set; }
        public int TotalMoney { get; set; }
        
        public string ProductTitle { get; set; }
        public string ProductThumbnail { get; set; }
    }

    public class AddToCartRequest
    {
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateCartItemRequest
    {
        public int Quantity { get; set; }
    }
}
