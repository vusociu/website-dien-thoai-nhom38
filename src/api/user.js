const API_URL = "https://website-dien-thoai-nhom38-production.up.railway.app/api";
import { getToken } from "../utils/storage";

export const updateUser = async (userData) => {
  // Build URL with query parameters
  let url = `${API_URL}/profile/update`;
  const token = getToken();
  
  try {
    let formData;
    let fullName, phone, address;
    
    // Check if userData is already FormData
    if (userData instanceof FormData) {
      formData = userData;
      fullName = formData.get('fullName');
    } else {
      // Create new FormData if userData is a regular object
      formData = new FormData();
      // Extract data from object
      fullName = userData.fullName;
      phone = userData.phone;
      address = userData.address;
      
      // Add fields to FormData
      if (fullName) formData.append('fullName', fullName);
      if (phone) formData.append('phone', phone);
      if (address) formData.append('address', address);
      if (userData.avatar) formData.append('avatar', userData.avatar);
    }
    
    // Validate required fields
    if (!fullName) {
      throw new Error("Họ và tên là bắt buộc");
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
        "Accept": "*/*",
      },
      body: formData,
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
