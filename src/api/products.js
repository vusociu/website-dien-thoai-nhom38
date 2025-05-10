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

export const searchProducts = async ({ title = "", minPrice, maxPrice, categoryId, sortOrder = "asc" }) => {
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (minPrice !== undefined) params.append("minPrice", minPrice);
  if (maxPrice !== undefined) params.append("maxPrice", maxPrice);
  if (categoryId !== undefined) params.append("categoryId", categoryId);
  if (sortOrder) params.append("sortOrder", sortOrder);

  const url = `${API_URL}/sorted-products?${params.toString()}`;
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
