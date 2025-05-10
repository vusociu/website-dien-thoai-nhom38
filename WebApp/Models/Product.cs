using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using WebApp.Data;

namespace WebApp.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public int CategoryId { get; set; }
        [Required, MaxLength(250)]
        public string Title { get; set; }
        public int Price { get; set; }

        [Range(0, 5)]
        [Column(TypeName = "decimal(3, 2)")]
        public float Rating { get; set; }

        [MaxLength(500)]
        public string Thumbnail { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int Discount { get; set; } = 0;
        public SoftDelete Deleted { get; set; } = SoftDelete.NO_DELETED;
    }
}
