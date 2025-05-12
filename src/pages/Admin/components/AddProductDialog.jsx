import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddProductDialog({
  open,
  newProduct,
  setNewProduct,
  onClose,
  onSave,
  onFileChange,
}) {
  const categories = [
    { name: "iPhone", id: 1 },
    { name: "Samsung", id: 2 },
    { name: "OPPO", id: 3 },
    { name: "Xiaomi", id: 4 },
    // { name: "Nokia", id: 5 },
    // { name: "iPad", id: 6 },
  ];
  const BASE_URL = "https://website-dien-thoai-nhom38-production.up.railway.app";
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm sản phẩm</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên sản phẩm"
          fullWidth
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          sx={{ mb: 2, mt : 1 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ backgroundColor: "white", px: 1 }} >Loại sản phẩm</InputLabel>
          <Select
            value={newProduct.categoryId || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryId: e.target.value })
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
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Mô tả sản phẩm"
          fullWidth
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        {/* <TextField
          label="Giảm giá (%)"
          type="number"
          fullWidth
          value={newProduct.discount}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discount: e.target.value })
          }
          sx={{ mb: 2 }}
        /> */}
        {/* <TextField
          label="Số lượng sản phẩm"
          type="number"
          fullWidth
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Số lượng đã bán"
          type="number"
          fullWidth
          value={newProduct.sold}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sold: e.target.value })
          }
          sx={{ mb: 2 }}
        /> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" component="label"  startIcon={<CloudUploadIcon />}>
            Tải lên hình ảnh
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => onFileChange(e, setNewProduct)}
            />
          </Button>
          {newProduct.imagePreview ? (
            <Box
              component="img"
              src={newProduct.imagePreview} // Hiển thị bản xem trước nếu có
              alt="Hình ảnh sản phẩm"
              sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
            />
          ) : newProduct.thumbnail ? (
            <Box
              component="img"
              src={`${BASE_URL}${newProduct.thumbnail}`} // Ghép URL gốc với thumbnail
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
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductDialog;