using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;
using System.Collections.Generic;
using System.Linq;
using WebApp.Repositories;
using WebApp.DTO.Product;
using WebApp.Middlewares;
using Microsoft.AspNetCore.Authorization;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // GET: api/products
        [HttpGet]
        public ActionResult<IEnumerable<GetProductDTO>> GetProducts()
        {
            return _productRepository.GetAll();
        }

        // GET: api/products/
        [HttpGet("{id}")]
        public ActionResult<GetProductByIdDTO> GetProduct(int id)
        {
            var productDTO = _productRepository.GetById(id);
            if (productDTO == null)
            {
                return NotFound();
            }

            return productDTO;
        }

        // POST: api/products
        [TypeFilter(typeof(AuthMiddleware))]
        [TypeFilter(typeof(AdminMiddleware))]
        [HttpPost]
        public ActionResult<GetProductDTO> CreateProduct(PostProductDTO productDTO)
        {
            var createdProductDTO = _productRepository.Create(productDTO);
            return CreatedAtAction(nameof(GetProduct), new { id = createdProductDTO.Id }, createdProductDTO);
        }

        // PUT: api/products/5
        [TypeFilter(typeof(AuthMiddleware))]
        [TypeFilter(typeof(AdminMiddleware))]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public IActionResult UpdateProduct(int id,[FromBody] PutProductDTO productDTO)
        {
            try
            {
                _productRepository.Update(id, productDTO);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // DELETE: api/products/5
        [TypeFilter(typeof(AuthMiddleware))]
        [TypeFilter(typeof(AdminMiddleware))]
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productRepository.byId(id);
            if (product == null)
            {
                return NotFound();
            }

            _productRepository.Delete(id);
            return NoContent();
        }
    }
}
