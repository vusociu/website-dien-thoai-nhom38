using WebApp.Models;

namespace WebApp.Repositories
{
    public interface ICategoryRepository
    {
        Category create(Category category);
        List<Category> list();

        void delete(int id);
        Category byId(int id);
    }
}
