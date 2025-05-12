using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.DTO.User;
using WebApp.Middlewares;
using WebApp.Models;
using WebApp.Repositories;
using WebApp.Transform;

namespace WebApp.Controllers
{
    [ApiController]
    [TypeFilter(typeof(AuthMiddleware))]
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
        [TypeFilter(typeof(AdminMiddleware))]
        [HttpGet("index")]
        public async Task<IActionResult> listUser()
        {
            return Ok(_userRepository.findAll());
        }

        [TypeFilter(typeof(AdminMiddleware))]
        [HttpPatch("{id}/update")]
        public async Task<IActionResult> updateUser([FromRoute] int id, [FromBody] UpdateUserDTO dto)
        {
            var user = _userRepository.byId(id);
            if (user == null || user.RoleId==Data.Role.ADMIN)
            {
                return BadRequest("No data");
            }
            user.Fullname = dto.fullName;
            user.PhoneNumber = dto.phone;
            user.Address = dto.address;
            user.RoleId = dto.roleId;
            return Ok(_userRepository.update(user));
        }

        [TypeFilter(typeof(AdminMiddleware))]
        [HttpGet("{id}/detail")]
        public async Task<IActionResult> detailUser([FromRoute] int id)
        {
            User user = _userRepository.byId(id);
            if (user == null || user.RoleId == Data.Role.ADMIN)
            {
                return BadRequest("No data");
            }
            return Ok(new
            {
                id= user.Id,
                fullName= user.Fullname,
                email= user.Email,
                phone= user.PhoneNumber,
                address= user.Address,
                roleId= user.RoleId,
            });
        }

        [HttpGet("{id}/list-order")]
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

        [HttpGet("{id}/cart")]
        public async Task<IActionResult> listOrderInCard([FromRoute] int id)
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
