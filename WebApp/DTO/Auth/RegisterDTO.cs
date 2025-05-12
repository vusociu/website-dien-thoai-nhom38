using System;

namespace WebApp.DTO.Auth
{
    public class RegisterDTO
    {
        public string email { get; set; }
        public string password { get; set; }
        public string fullName { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public int roleId { get; set; } = 1;
    }
}

