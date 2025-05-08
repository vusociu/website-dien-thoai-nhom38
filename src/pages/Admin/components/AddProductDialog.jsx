import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";

function AddProductDialog({
  open,
  newProduct,
  setNewProduct,
  onClose,
  onSave,
  onFileChange,
}) {
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
          sx={{ mb: 2 }}
        />
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
        <TextField
          label="Giảm giá (%)"
          type="number"
          fullWidth
          value={newProduct.discount}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discount: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
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
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Button variant="contained" component="label">
            Tải lên hình ảnh
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={onFileChange}
            />
          </Button>
          {newProduct.imagePreview && (
            <Box
              component="img"
              src={newProduct.imagePreview}
              alt="Hình ảnh sản phẩm"
              sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
            />
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