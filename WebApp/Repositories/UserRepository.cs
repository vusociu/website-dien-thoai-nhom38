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
            return _context.Users.Where(u => u.RoleId== WebApp.Data.Role.USER).OrderBy(u=>u.CreatedAt).ToList();
        }

        public List<User> byIds(int[] ids)
        {
            return _context.Users.Where(u => ids.Contains(u.Id)).OrderBy(u => u.CreatedAt).ToList();
        }

        public User byId(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User update(User updateUser)
        {
            var existingUser = _context.Users.Find(updateUser.Id);
            _context.Entry(existingUser).CurrentValues.SetValues(updateUser);
            _context.SaveChangesAsync();

            return existingUser;
        }
    }
}

