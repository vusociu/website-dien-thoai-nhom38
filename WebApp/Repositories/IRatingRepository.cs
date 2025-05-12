using WebApp.Models;

namespace WebApp.Repositories;

public interface IRatingRepository
{
    List<Rating> byProductId(int productId);
    Rating create(Rating rating);
}