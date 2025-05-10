const API_URL = "https://website-dien-thoai-nhom38-production.up.railway.app/api";

export const updateUser = async (userId, userData) => {
  const url = `${API_URL}/user/${userId}/update`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Lỗi khi cập nhật người dùng");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi updateUser:", error);
    throw error;
  }
};
