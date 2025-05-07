const TOKEN_KEY = "access_token";
const USER_KEY = "user_info";

// Lưu token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Lấy token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Xóa token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Lưu thông tin người dùng (fullName, role, ...) 
export const setUserInfo = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Lấy thông tin người dùng 
export const getUserInfo = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// Xóa thông tin người dùng
export const removeUserInfo = () => {
  localStorage.removeItem(USER_KEY);
};

// Xóa dữ liệu đăng nhập
export const clearAuthData = () => {
  removeToken();
  removeUserInfo();
};
