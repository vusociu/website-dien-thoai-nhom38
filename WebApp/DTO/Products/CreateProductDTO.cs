using System.ComponentModel.DataAnnotations;

namespace WebApp.DTO.Products
{
    public class CreateProductDTO
    {
        public int CategoryId { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; }
        public int Price { get; set; }
        public int Discount { get; set; }
        public IFormFile Thumbnail { get; set; }
        public string Description { get; set; }
    }
}
