using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Controllers
{
    [Route("api/sorted-products")]
    [ApiController]
    public class SortedProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SortedProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/sorted-products?title=phone&minPrice=100&maxPrice=1000&categoryId=2&sortOrder=desc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetFilteredSortedProducts(
            [FromQuery] string? title,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] int? categoryId,
            [FromQuery] string sortOrder = "asc")
        {
            var query = _context.Products.AsQueryable();

            // Lọc theo tên
            if (!string.IsNullOrWhiteSpace(title))
            {
                query = query.Where(p => p.Title.Contains(title));
            }

            // Lọc theo khoảng giá
            if (minPrice.HasValue)
            {
                query = query.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= maxPrice.Value);
            }

            // Lọc theo categoryId nếu có
            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            // Sắp xếp theo giá
            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(p => p.Price)
                : query.OrderBy(p => p.Price);

            return Ok(await query.ToListAsync());
        }
    }
}
