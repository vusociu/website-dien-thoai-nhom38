using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class UserToken
    {
        [Key]
        public int UserId { get; set; }
        //[Key, MaxLength(32)]
        public string Token { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}