using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        [MaxLength(50)]
        public string Fullname { get; set; }
        [MaxLength(150)]
        public string Email { get; set; }
        [MaxLength(20)]
        public string PhoneNumber { get; set; }
        [MaxLength(200)]
        public string Address { get; set; }
        [MaxLength(1000)]
        public string Note { get; set; }
        public DateTime OrderDate { get; set; }
        public int Status { get; set; }
        public int TotalMoney { get; set; }
    }
}
