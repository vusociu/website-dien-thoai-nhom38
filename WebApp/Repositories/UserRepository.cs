using System;
using WebApp.Data;
using WebApp.Models;


namespace WebApp.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User create(User user)
        {
            _context.Users.Add(user);
            user.Id = _context.SaveChanges();
            return user;
        }

        public User getByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        public List<User> findAll()
        {
            return _context.Users.Where(u => u.RoleId!=0).ToList();
        }

        public User byId(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User update(User updateUser)
        {
            return _context.Users.Update(updateUser).Entity;
        }
    }
}

