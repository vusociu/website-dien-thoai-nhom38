using WebApp.Models;

namespace WebApp.Repositories
{
    public interface IProductRepository
    {
        List<Product> byIds(int[] ids);
        Product byId(int id);
    }
}
