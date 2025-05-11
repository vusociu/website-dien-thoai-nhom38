import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = [
  { name: "iPhone", id: 1 },
  { name: "Samsung", id: 2 },
  { name: "OPPO", id: 3 },
  { name: "Xiaomi", id: 4 },
  { name: "Nokia", id: 5 },
  { name: "iPad", id: 6 },
];
const BASE_URL = "https://website-dien-thoai-nhom38-production.up.railway.app";


function ProductTable({ products, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Loại sản phẩm</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Mô tả</TableCell>
            {/* <TableCell>Giảm giá (%)</TableCell> */}
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>
                {
                  categories.find((category) => category.id === product.categoryId)
                    ?.name || "Không xác định"
                }
              </TableCell>
              <TableCell>{product.price.toLocaleString()}đ</TableCell>
              <TableCell>{product.description}</TableCell>
              {/* <TableCell>{product.discount}%</TableCell> */}
              <TableCell>
                {/* Hiển thị hình ảnh */}
                {product.thumbnail ? (
                  <img
                    src={`${BASE_URL}${product.thumbnail}`} // Ghép URL gốc với thumbnail
                    alt={product.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  "Không có hình ảnh"
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;