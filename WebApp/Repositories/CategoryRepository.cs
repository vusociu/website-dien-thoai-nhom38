using WebApp.Data;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Category byId(int id)
        {
            return _context.Categories.FirstOrDefault(u => u.Id == id);
        }

        public Category create(Category category)
        {
            _context.Categories.Add(category);
            category.Id = _context.SaveChanges();
            return category;
        }

        public void delete(int id)
        {
            Category category = _context.Categories.FirstOrDefault(u => u.Id == id);
            category.Deleted = SoftDelete.DELETED;
            _context.Categories.Update(category);
        }

        public List<Category> list()
        {
            return _context.Categories.Where(u => u.Deleted == SoftDelete.NO_DELETED).ToList();
        }
    }
}
