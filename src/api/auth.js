const API_URL = "https://website-dien-thoai-nhom38-production.up.railway.app/api";

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Đăng ký thất bại");
  }
  const data = await response.json();
  return data;
  } catch (error) {
    console.error("Lỗi register:", error);
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Đăng nhập thất bại");
  }
  const data = await response.json();
  return data;
  } catch (error) {
    console.error("Lỗi login:", error);
    throw error;
  }
};