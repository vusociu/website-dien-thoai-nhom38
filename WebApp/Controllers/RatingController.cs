using Microsoft.AspNetCore.Mvc;
using WebApp.DTO.Rating;
using WebApp.Middlewares;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Transform;

namespace WebApp.Controllers
{
    [Route("api/rating")]
    public class RatingController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        public RatingController(IRatingRepository ratingRepository, IProductRepository productRepository, IUserRepository userRepository)
        {
            _ratingRepository = ratingRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }
        
        
        [HttpGet("{productId}")]
        public IActionResult manage([FromRoute] int productId)
        {
            var product = _productRepository.byId(productId);
            if(product == null)
            {
                return NotFound();
            }
            List<Rating> ratings = _ratingRepository.byProductId(productId);
            int[] userIds = ratings.Select(u => u.UserId).ToArray();
            List<User> users = _userRepository.byIds(userIds);

            var result = ratings.Select(rating =>
            {
                User matchingUser = users.FirstOrDefault(user => user.Id == rating.UserId);
                return new
                {
                    id = rating.Id,
                    point = rating.Point,
                    content = rating.Content,
                    userName = matchingUser.Fullname,
                    userAvatar = matchingUser.Avatar,
                    createdAt = rating.CreatedAt.AddHours(7)
                };
            }).ToList();
            return Ok(result);
        }

        [TypeFilter(typeof(AuthMiddleware))]
        [HttpPost("{productId}")]
        public IActionResult manage([FromRoute] int productId, [FromBody] CreateRatingDTO dto)
        {
            var product = _productRepository.byId(productId);
            if (product == null || dto==null)
            {
                return BadRequest("No data found");
            }
            Rating rating = new Rating
            {
                ProductId = productId,
                UserId = (int)HttpContext.Items["User"],
                Point = dto.Point,
                Content = dto.Comment,
            };
            _ratingRepository.create((rating));
            return Ok();
        }
    }
}
