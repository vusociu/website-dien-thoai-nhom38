using Microsoft.AspNetCore.Mvc;
using WebApp.DTO.User;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;
        public UserController(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }
        [HttpGet("index")]
        public async Task<IActionResult> listUser()
        {
            return Ok(_userRepository.findAll());
        }

        [HttpGet("/{id}/update")]
        public async Task<IActionResult> updateUser([FromRoute] int id, [FromBody] UpdateUserDTO dto)
        {
            User user = _userRepository.byId(id);
            user.Fullname = dto.fullName;
            user.PhoneNumber = dto.phone;
            user.Address = dto.address;
            user.RoleId = dto.roleId;
            return Ok(_userRepository.update(user));
        }
    }
}
