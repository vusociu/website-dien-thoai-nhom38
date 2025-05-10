using Microsoft.AspNetCore.Mvc;
using System.Net;
using WebApp.DTO.User;
using WebApp.helpers;
using WebApp.Models;
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


        [HttpGet("")]
        public IActionResult updateProfile()
        {
            return Ok(_userRepository.byId((int)HttpContext.Items["User"]));
        }

        [HttpPatch("update")]
        public IActionResult updateProfile(UpdateUserProfileDTO dto)
        {
            var user = _userRepository.byId((int)HttpContext.Items["User"]);
            user.Fullname = dto.fullName;
            user.PhoneNumber = dto.phone;
            user.Address = dto.address;
            user.Avatar = Helper.uploadFile(dto.avatar);
            _userRepository.update(user);
            return Ok();
        }
    }
}
