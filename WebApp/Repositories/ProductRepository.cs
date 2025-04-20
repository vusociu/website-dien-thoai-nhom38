using WebApp.Data;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context) 
        {
            _context = context;
        }
        public Product byId(int id)
        {
            return _context.Products.FirstOrDefault(u => u.Id == id);
        }

        public List<Product> byIds(int[] ids)
        {
            return _context.Products.Where(u => ids.Contains(u.Id)).ToList();
        }
    }
}
