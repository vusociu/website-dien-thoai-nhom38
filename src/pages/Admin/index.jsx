import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import ProductTable from "./components/ProductTable";
import EditProductDialog from "./components/EditProductDialog";
import AddProductDialog from "./components/AddProductDialog";
import AppBar from '../../layout/AppBar/index.jsx';

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
    discount: "",
    image: null,
    imagePreview: null,
  });
  const [newProduct, setNewProduct] = useState({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    discount: "",
    image: null,
    imagePreview: null,
  });

  // Hàm gọi API lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      const response = await fetch(productApi, {
        method: "GET",
        headers: {
          "Accept": "application/json",
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
      const response = await fetch(productApi, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          categoryId: newProduct.categoryId,
          title: newProduct.title,
          price: Number(newProduct.price),
          discount: Number(newProduct.discount),
          thumbnail: newProduct.imagePreview || "",
          description: newProduct.description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deleted: 0,
        }),
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
        discount: "",
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
      const response = await fetch(`${productApi}/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingProduct.id,
          categoryId: editingProduct.categoryId,
          title: editingProduct.title,
          price: Number(editingProduct.price),
          discount: Number(editingProduct.discount),
          thumbnail: editingProduct.imagePreview || "",
          description: editingProduct.description,
          createdAt: editingProduct.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deleted: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
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
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== id)); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({ ...newProduct, imagePreview: reader.result });
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