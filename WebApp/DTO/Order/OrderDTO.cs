using System;
using System.Collections.Generic;
using WebApp.DTO.Cart;

namespace WebApp.DTO.Order
{
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

    public class OrderDetailDto
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Price { get; set; }
        public int Num { get; set; }
        public int TotalMoney { get; set; }
        public string ProductTitle { get; set; }
        public string ProductThumbnail { get; set; }
    }

    public class OrderWithDetailsDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public DateTime OrderDate { get; set; }
        public int Status { get; set; }
        public int TotalMoney { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
    }

    public class CheckoutResponse
    {
        public int OrderId { get; set; }
        public string Message { get; set; }
    }
}
