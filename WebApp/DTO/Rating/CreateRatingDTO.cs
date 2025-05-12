using System.ComponentModel.DataAnnotations;

namespace WebApp.DTO.Rating;

public class CreateRatingDTO
{
    [Required]
     public float Point { get; set; }
    [Required]
     public string Comment { get; set; }
}