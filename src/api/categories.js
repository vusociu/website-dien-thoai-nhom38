const API_URL = "https://website-dien-thoai-nhom38-production.up.railway.app/api";

export const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${API_URL}/category/list`,
        {
          headers: {
            accept: "*/*",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Lỗi khi lấy danh sách danh mục");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi fetchCategories:", error);
      throw error;
    }
  };