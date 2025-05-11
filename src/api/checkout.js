const API_URL = "https://website-dien-thoai-nhom38-production.up.railway.app/api/"
import { getToken } from "../utils/storage";

export const checkout = async (checkoutData) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}Order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
          "Accept": "*/*",
        },
        body: JSON.stringify(checkoutData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đặt hàng thất bại");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi checkout:", error);
      throw error;
    }
  };