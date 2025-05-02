using System;
using Microsoft.AspNetCore.Mvc;
using WebApp.Models;
using WebApp.DTO.Auth;
using WebApp.Repositories;


namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> register(RegisterDTO dto)
        {
            var existUser = _repository.getByEmail(dto.email);
            if (existUser!=null)
            {
                return BadRequest(new { message = "Email đã được đăng ký, vui lòng thử lại" });
            }
            var user = new User
            {
                Email = dto.email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.password),
                Fullname = dto.fullName,
                PhoneNumber = dto.phone,
                Address = dto.address,
                RoleId = dto.roleId
            };

            return Created("Success", _repository.create(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> register(LoginDTO dto)
        {
            var user = _repository.getByEmail(dto.email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid credentials" });
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.password, user.Password))
            {
                return BadRequest(new { message = "Invalid credentials" });
            }
            var jwt = _jwtService.generate(user.Id);

            Response.Cookies.Append("bearer_token", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new
            {
                token = jwt,
                fullName = user.Fullname,
                role = user.RoleId
            });
        }
    }
}
