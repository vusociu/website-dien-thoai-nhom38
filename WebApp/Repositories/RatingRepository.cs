using WebApp.Data;
using WebApp.Models;

namespace WebApp.Repositories;

public class RatingRepository : IRatingRepository
{
    private readonly ApplicationDbContext _context;
    public RatingRepository(ApplicationDbContext context)
    {
        _context = context;
    }    
    
    public List<Rating> byProductId(int productId)
    {
        return _context.Ratings.Where(u => u.ProductId == productId).ToList();
    }

    public Rating create(Rating rating)
    {
        _context.Ratings.Add(rating);
        rating.Id = _context.SaveChanges();
        return rating;
    }
}