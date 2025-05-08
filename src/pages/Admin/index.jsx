import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ProductTable from "./components/ProductTable";
import EditProductDialog from "./components/EditProductDialog";
import AddProductDialog from "./components/AddProductDialog";
import AppBar from '../../layout/AppBar/index.jsx';


let productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';

function Admin() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone 14",
      price: 20000000,
      description: "Điện thoại cao cấp của Apple",
      discount: 10,
      quantity: 100,
      sold: 20,
      image: null,
    },
    {
      id: 2,
      title: "Samsung Galaxy S23",
      price: 18000000,
      description: "Điện thoại flagship của Samsung",
      discount: 5,
      quantity: 50,
      sold: 10,
      image: null,
    },
  ]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    discount: "",
    quantity: "",
    sold: "",
    image: null,
    imagePreview: null,
  });

  const handleAddProduct = async () => {
    try {
        const response = await fetch(productApi, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 0, // ID sẽ được server tự động tạo
                categoryId: 0, // Thay bằng categoryId thực tế nếu cần
                title: newProduct.title,
                price: Number(newProduct.price),
                discount: Number(newProduct.discount),
                thumbnail: newProduct.imagePreview || "", // URL hình ảnh
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
            price: "",
            description: "",
            discount: "",
            quantity: "",
            sold: "",
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
              categoryId: 0, // Thay bằng categoryId thực tế nếu cần
              title: editingProduct.title,
              price: Number(editingProduct.price),
              discount: Number(editingProduct.discount),
              thumbnail: editingProduct.imagePreview || "", // URL hình ảnh
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
  const file = e.target.files[0]; // Lấy file đầu tiên từ input
  if (file) {
      const reader = new FileReader(); // Tạo FileReader để đọc file
      reader.onload = () => {
          setNewProduct({ ...newProduct, imagePreview: reader.result }); // Cập nhật bản xem trước hình ảnh
      };
      reader.readAsDataURL(file); // Đọc file dưới dạng URL
  }
};

  return (
    <Box><AppBar /> 
    
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