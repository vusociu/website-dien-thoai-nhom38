using WebApp.Data;
using WebApp.DTO.Product;
using WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApp.helpers;

namespace WebApp.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ICategoryRepository _categoryRepository;

        public ProductRepository(ApplicationDbContext context, ICategoryRepository categoryRepository)
        {
            _context = context;
            _categoryRepository = categoryRepository;
        }

        public List<GetProductDTO> GetAll()
        {
            return _context.Products
                .Where(p => p.Deleted == SoftDelete.NO_DELETED)
                .Select(p => new GetProductDTO
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    Title = p.Title,
                    Price = p.Price,
                    Rating = p.Rating,
                    Thumbnail = p.Thumbnail,
                    Description = p.Description
                })
                .ToList();
        }

        public GetProductByIdDTO GetById(int id)
        {
            var product = _context.Products
                .FirstOrDefault(p => p.Id == id && p.Deleted == SoftDelete.NO_DELETED);

            if (product == null)
                return null;

            var category = _categoryRepository.byId(product.CategoryId);

            return new GetProductByIdDTO
            {
                Id = product.Id,
                CategoryId = product.CategoryId,
                Title = product.Title,
                Price = product.Price,
                Rating = product.Rating,
                Thumbnail = product.Thumbnail,
                Description = product.Description,
                CategoryTitle = category?.Name
            };
        }

        public GetProductDTO Create(PostProductDTO productDTO)
        {
            var product = new Product
            {
                CategoryId = productDTO.CategoryId,
                Title = productDTO.Title,
                Price = productDTO.Price,
                Rating = productDTO.Rating,
                Thumbnail = Helper.uploadFile(productDTO.Thumbnail),
                Description = productDTO.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Deleted = SoftDelete.NO_DELETED
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return new GetProductDTO
            {
                Id = product.Id,
                CategoryId = product.CategoryId,
                Title = product.Title,
                Price = product.Price,
                Rating = product.Rating,
                Thumbnail = product.Thumbnail,
                Description = product.Description
            };
        }

        public Product byId(int id)
        {
            return _context.Products.FirstOrDefault(u => u.Id == id);
        }

        public List<Product> byIds(int[] ids)
        {
            return _context.Products.Where(u => ids.Contains(u.Id)).ToList();
        }

        public void Update(int id, PutProductDTO productDTO)
        {
            var existingProduct = _context.Products
                .FirstOrDefault(p => p.Id == id && p.Deleted == SoftDelete.NO_DELETED);

            if (existingProduct == null)
                throw new KeyNotFoundException($"Product with ID {id} not found");

            existingProduct.CategoryId = productDTO.CategoryId;
            existingProduct.Title = productDTO.Title;
            existingProduct.Price = productDTO.Price;
            existingProduct.Rating = productDTO.Rating;
            if (productDTO.Thumbnail != null && productDTO.Thumbnail.Length > 0)
            {
                existingProduct.Thumbnail = Helper.uploadFile(productDTO.Thumbnail);
            }
            existingProduct.Description = productDTO.Description;
            existingProduct.UpdatedAt = DateTime.UtcNow;

            _context.Products.Update(existingProduct);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }
    }
}
