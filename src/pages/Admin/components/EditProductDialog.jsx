import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

function EditProductDialog({ open, product, setProduct, onClose, onSave }) {
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
        <TextField
          label="Giảm giá (%)"
          type="number"
          fullWidth
          value={product?.discount || ""}
          onChange={(e) =>
            setProduct({ ...product, discount: Number(e.target.value) })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Số lượng sản phẩm"
          type="number"
          fullWidth
          value={product?.quantity || ""}
          onChange={(e) =>
            setProduct({ ...product, quantity: Number(e.target.value) })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          label="Số lượng đã bán"
          type="number"
          fullWidth
          value={product?.sold || ""}
          onChange={(e) =>
            setProduct({ ...product, sold: Number(e.target.value) })
          }
        />
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