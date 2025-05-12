using System.ComponentModel.DataAnnotations;
using WebApp.Data;

namespace WebApp.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(30)]
        public string Firstname { get; set; }
        [MaxLength(30)]
        public string Lastname { get; set; }
        [MaxLength(250)]
        public string Email { get; set; }
        [MaxLength(20)]
        public string PhoneNumber { get; set; }
        [MaxLength(350)]
        public string SubjectName { get; set; }
        [MaxLength(1000)]
        public string Note { get; set; }
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public SoftDelete Deleted { get; set; } = SoftDelete.NO_DELETED;
    }
}