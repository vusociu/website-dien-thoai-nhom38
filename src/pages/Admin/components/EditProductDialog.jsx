import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function EditProductDialog({ open, product, setProduct, onClose, onSave }) {
  const categories = [
    { name: "iPhone", id: 1 },
    { name: "Samsung", id: 2 },
    { name: "OPPO", id: 3 },
    { name: "Xiaomi", id: 4 },
    { name: "Nokia", id: 5 },
    { name: "iPad", id: 6 },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProduct({ ...product, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const BASE_URL = "https://website-dien-thoai-nhom38-production.up.railway.app";
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên sản phẩm"
          fullWidth
          value={product?.title || ""}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel  sx={{ backgroundColor: "white", px: 1 }}>Loại sản phẩm</InputLabel>
          <Select
            value={product?.categoryId || ""}
            onChange={(e) =>
              setProduct({ ...product, categoryId: e.target.value })
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Giá sản phẩm"
          type="number"
          fullWidth
          value={product?.price || ""}
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mô tả sản phẩm"
          fullWidth
          value={product?.description || ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        {/* <TextField
          label="Giảm giá (%)"
          type="number"
          fullWidth
          value={product?.discount || ""}
          onChange={(e) =>
            setProduct({ ...product, discount: Number(e.target.value) })
          }
          sx={{ mb: 2 }}
        /> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
            Tải lên hình ảnh
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProduct)}
            />
          </Button>
        {product?.imagePreview ? (
        <Box
          component="img"
          src={product.imagePreview} // Hiển thị bản xem trước nếu có
          alt="Hình ảnh sản phẩm"
          sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
        />
        ) : product?.thumbnail ? (
          <Box
            component="img"
            src={`${BASE_URL}${product.thumbnail}`} // Ghép URL gốc với thumbnail
            alt="Hình ảnh sản phẩm"
            sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
          />
        ) : (
          "Không có hình ảnh"
        )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={onSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditProductDialog;