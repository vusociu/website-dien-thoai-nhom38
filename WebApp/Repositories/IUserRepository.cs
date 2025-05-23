﻿using System;
using WebApp.Models;
namespace WebApp.Repositories
{
    public interface IUserRepository
    {
        User create(User user);
        User getByEmail(string email);

        List<User> findAll();
        List<User> byIds(int[] ids);
        User? byId(int id);
        User update(User updateUser);
    }
}

