using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(20)]
        public string Name { get; set; }
    }
}
