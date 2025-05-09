using System.ComponentModel.DataAnnotations;

namespace WebApp.DTO.Product
{
    public class PostProductDTO
    {
        public int CategoryId { get; set; }

        [Required, MaxLength(250)]
        public string Title { get; set; }

        public int Price { get; set; }

        [Range(0, 5)]
        public float Rating { get; set; }

        [MaxLength(500)]
        public string Thumbnail { get; set; }

        public string Description { get; set; }
    }
}