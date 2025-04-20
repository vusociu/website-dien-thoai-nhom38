using Microsoft.AspNetCore.Mvc;
using WebApp.DTO.User;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Transform;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;
        private IOrderRepository _orderRepository;
        private IOrderDetailRepository _orderDetailRepository;
        private IProductRepository _productRepository;
        public UserController(
            IUserRepository userRepository,
            IOrderRepository orderRepository,
            IOrderDetailRepository orderDetailRepository,
            IProductRepository productRepository
        ){
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
        }
        [HttpGet("index")]
        public async Task<IActionResult> listUser()
        {
            return Ok(_userRepository.findAll());
        }

        [HttpPatch("/{id}/update")]
        public async Task<IActionResult> updateUser([FromRoute] int id, [FromBody] UpdateUserDTO dto)
        {
            User user = _userRepository.byId(id);
            user.Fullname = dto.fullName;
            user.PhoneNumber = dto.phone;
            user.Address = dto.address;
            user.RoleId = dto.roleId;
            return Ok(_userRepository.update(user));
        }

        [HttpGet("/{id}/detail")]
        public async Task<IActionResult> detailUser([FromRoute] int id)
        {
            User user = _userRepository.byId(id);
            if (user == null)
            {
                return BadRequest("No data");
            }
            return Ok(user);
        }

        [HttpGet("/{id}/list-order")]
        public async Task<IActionResult> listOrder([FromRoute] int id)
        {
            List<Order> orders = _orderRepository.byUserId(id);
            int[] orderIds = orders.Select(o => o.Id).ToArray();
            List<OrderDetail> orderDetails = _orderDetailRepository.byOrderIds(orderIds);
            int[] productIds = orderDetails.Select(o => o.ProductId).ToArray();
            List<Product> products = _productRepository.byIds(productIds);
            var result = orders.Select(order =>
            {
                var matchingDetail = orderDetails.FirstOrDefault(detail => detail.OrderId == order.Id);
                var matchingProduct = products.FirstOrDefault(product => product.Id == matchingDetail.ProductId);
                return new OrderWithDetailTransform
                {
                    order = order,
                    orderDetail = matchingDetail,
                    product = matchingProduct
                };
            }).ToList();

            return Ok(result);
        }
    }
}
