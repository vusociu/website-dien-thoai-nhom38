import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ProductTable from "./components/ProductTable";
import EditProductDialog from "./components/EditProductDialog";
import AddProductDialog from "./components/AddProductDialog";
import AppBar from '../../layout/AppBar/index.jsx';
import { getToken } from "../../utils/storage";

let productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';

function Admin() {
  const [products, setProducts] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
    imagePreview: null,
  });
  const [newProduct, setNewProduct] = useState({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
    imagePreview: null,
  });
  const token = getToken();
  // Hàm gọi API lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await fetch(productApi, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Gọi API lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

const handleAddProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("categoryId", newProduct.categoryId);
    formData.append("title", newProduct.title);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    if (newProduct.image) {
      formData.append("thumbnail", newProduct.image); // Gửi file thực tế
    }

    const response = await fetch(productApi, {
      method: "POST",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const createdProduct = await response.json();
    setProducts([...products, createdProduct]); // Cập nhật danh sách sản phẩm
    setNewProduct({
      title: "",
      categoryId: "",
      price: "",
      description: "",
      image: null,
      imagePreview: null,
    });
    setOpenAddDialog(false); // Đóng dialog
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const handleEditProduct = async () => {
  try {
    // Kiểm tra dữ liệu trước khi gửi
    if (!editingProduct.title || !editingProduct.categoryId || !editingProduct.price) {
      console.error("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      return;
    }

    // Chuẩn bị dữ liệu JSON
    const updatedProductData = {
      categoryId: editingProduct.categoryId,
      title: editingProduct.title,
      price: editingProduct.price,
      rating: editingProduct.rating || 0, // Nếu không có rating, mặc định là 0
      thumbnail: editingProduct.imagePreview || editingProduct.thumbnail || "", // Sử dụng hình ảnh mới hoặc giữ nguyên hình ảnh cũ
      description: editingProduct.description,
    };

    // Gửi yêu cầu PUT
    const response = await fetch(`${productApi}/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updatedProductData), // Gửi dữ liệu dưới dạng JSON
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const updatedProduct = await response.json();
    console.log("Updated Product:", updatedProduct); // Log sản phẩm đã cập nhật

   // Cập nhật danh sách sản phẩm
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    //  setProducts([...products, createdProduct]);
    setOpenEditDialog(false); // Đóng dialog
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${productApi}/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "*/*",
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

const handleFileChange = (e, setProduct) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setProduct((prev) => ({
        ...prev,
        image: file, // Lưu file thực tế
        imagePreview: reader.result, // Hiển thị bản xem trước
      }));
    };
    reader.readAsDataURL(file);
  }
};

  return (
    <Box>
      <AppBar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Quản lý sản phẩm
        </Typography>

        {/* Nút thêm sản phẩm */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
            Thêm sản phẩm
          </Button>
        </Box>

        {/* Bảng danh sách sản phẩm */}
        <ProductTable
          products={products}
          onEdit={(product) => {
            setEditingProduct(product);
            setOpenEditDialog(true);
          }}
          onDelete={handleDeleteProduct}
        />

        {/* Dialog thêm sản phẩm */}
        <AddProductDialog
          open={openAddDialog}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          onClose={() => setOpenAddDialog(false)}
          onSave={handleAddProduct}
          onFileChange={handleFileChange}
        />

        {/* Dialog chỉnh sửa sản phẩm */}
        <EditProductDialog
          open={openEditDialog}
          product={editingProduct}
          setProduct={setEditingProduct}
          onClose={() => setOpenEditDialog(false)}
          onSave={handleEditProduct}
        />
      </Box>
    </Box>
  );
}

export default Admin;