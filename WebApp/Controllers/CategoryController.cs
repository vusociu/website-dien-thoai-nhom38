using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Controllers
{
    [Route("api/category")]
    public class CategoryController : Controller
    {
        private ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// Creates a new category.
        /// </summary>
        /// <param name="input">The category name to create.</param>
        /// <returns>The created category.</returns>
        [HttpPost("create")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult Create([FromBody] CreateCategoryInput input)
        {
            Category category = new Category
            {
                Name = input.Name
            };
            var createdCategory = _categoryRepository.create(category);
            return Ok(createdCategory);
        }

        /// <summary>
        /// Deletes a category by ID.
        /// </summary>
        /// <param name="input">The ID of the category to delete.</param>
        /// <returns>Status of the operation.</returns>
        [HttpDelete("delete")]
        [Produces("application/json")]
        [Consumes("application/json")]
        public IActionResult delete([FromBody] DeleteCategoryInput input)
        {
            _categoryRepository.delete(input.Id);
            return Ok();
        }

        /// <summary>
        /// Lists all categories.
        /// </summary>
        /// <returns>List of categories.</returns>
        [HttpGet("list")]
        [Produces("application/json")]
        public IActionResult list()
        {
            return Ok(_categoryRepository.list());
        }


        // Input Models for Swagger
        public class CreateCategoryInput
        {
            /// <summary>
            /// Name of the category to create.
            /// </summary>
            public string Name { get; set; }
        }

        public class DeleteCategoryInput
        {
            /// <summary>
            /// ID of the category to delete.
            /// </summary>
            public int Id { get; set; }
        }
    }
}
