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
        public UserController(IUserRepository userRepository, IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository) 
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
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

            var result = orders.Select(order =>
            {
                var matchingDetail = orderDetails.FirstOrDefault(detail => detail.OrderId == order.Id);

                return new OrderWithDetailTransform
                {
                    order = order,
                    orderDetail= matchingDetail
                };
            }).ToList();

            return Ok(result);
        }
    }
}
