using Microsoft.AspNetCore.Mvc;
using WebApp.DTO.User;
using WebApp.helpers;
using WebApp.Middlewares;
using WebApp.Repositories;

namespace WebApp.Controllers
{
    [Route("api/profile")]
    public class UserProfileController : Controller
    {
        private IUserRepository _userRepository;
        public UserProfileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [TypeFilter(typeof(AuthMiddleware))]
        [HttpGet]
        public IActionResult indexProfile()
        {
            return Ok(_userRepository.byId((int)HttpContext.Items["User"]));
        }

        [TypeFilter(typeof(AuthMiddleware))]
        [HttpPatch("update")]
        public IActionResult updateProfile(UpdateUserProfileDTO dto)
        {
            var user = _userRepository.byId((int)HttpContext.Items["User"]);
            user.Fullname = dto.fullName;
            user.PhoneNumber = string.IsNullOrEmpty(dto.phone) ? "" : dto.phone;
            user.Address = string.IsNullOrEmpty(dto.address) ? "" : dto.address;
            user.Avatar = dto.avatar == null ? "" : Helper.uploadFile(dto.avatar);
            _userRepository.update(user);
            return Ok(user);
        }
    }
}
