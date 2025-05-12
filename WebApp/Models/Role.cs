using System.ComponentModel.DataAnnotations;
using WebApp.Data;

namespace WebApp.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(20)]
        public string Name { get; set; }
        public SoftDelete Deleted { get; set; } = SoftDelete.NO_DELETED;
    }
}
