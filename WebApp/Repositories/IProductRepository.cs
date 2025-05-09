using WebApp.Models;

namespace WebApp.Repositories
{
    public interface IProductRepository
    {
        List<Product> byIds(int[] ids);
        Product byId(int id);
        List<Product> GetAll();
        Product Create(Product product);
        void Update(Product product);
        void Delete(int id);
    }
}
