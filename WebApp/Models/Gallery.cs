using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Gallery
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        [MaxLength(500)]
        public string Thumbnail { get; set; }
    }
}