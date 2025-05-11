const TOKEN_KEY = "access_token";
const USER_KEY = "user_info";
const CART_KEY = "cart_items";

//token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

//user
export const setUserInfo = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserInfo = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeUserInfo = () => {
  localStorage.removeItem(USER_KEY);
};

//đăng nhập
export const clearAuthData = () => {
  removeToken();
  removeUserInfo();
};

//giỏ hàng
export const setCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const getCartItems = () => {
  const cartItems = localStorage.getItem(CART_KEY);
  return cartItems ? JSON.parse(cartItems) : [];
};

export const removeCartItems = () => {
  localStorage.removeItem(CART_KEY);
};
