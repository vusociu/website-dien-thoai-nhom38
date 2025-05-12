using System.ComponentModel.DataAnnotations;
using WebApp.Data;

namespace WebApp.Models
{
    public class Gallery
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        [MaxLength(500)]
        public string Thumbnail { get; set; }
        public SoftDelete Deleted { get; set; } = SoftDelete.NO_DELETED;
    }
}