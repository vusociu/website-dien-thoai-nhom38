 using WebApp.DTO.Product;
 using WebApp.Models;

namespace WebApp.Repositories
{
    public interface IProductRepository
    {
        List<GetProductDTO> GetAll();
        GetProductByIdDTO GetById(int id);
        GetProductDTO Create(PostProductDTO productDTO);

        List<Product> byIds(int[] ids);
        Product byId(int id);

        void Update(int id, PutProductDTO productDTO);
        void Delete(int id);
    }
}