using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public float Point { get; set; }
        public string Content { get; set; }
    }
}
