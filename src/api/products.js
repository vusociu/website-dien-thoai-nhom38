const API_URL = "https://website-dien-thoai-nhom38-production.up.railway.app/api";

export const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${API_URL}/Products`,
      {
        headers: {
          accept: "text/plain",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách sản phẩm");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi fetchProducts:", error);
    throw error;
  }
};

export const searchProducts = async ({ title = "", minPrice = 0, maxPrice = 0, categoryId = 0, sortOrder = "asc" }) => {
  const url = `${API_URL}/sorted-products?title=${encodeURIComponent(title)}&minPrice=${minPrice}&maxPrice=${maxPrice}&categoryId=${categoryId}&sortOrder=${sortOrder}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error("Lỗi khi tìm kiếm sản phẩm");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi searchProducts:", error);
    throw error;
  }
};
