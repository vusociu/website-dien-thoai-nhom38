using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        [MaxLength(500)]
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Deleted { get; set; }
    }
}
