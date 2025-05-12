using System.ComponentModel.DataAnnotations;

namespace WebApp.DTO.User
{
    public class UpdateUserProfileDTO
    {
        [Required]
        public string fullName { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public IFormFile avatar { get; set; }
    }
}
