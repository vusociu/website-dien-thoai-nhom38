import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Tooltip
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSearchParams } from "react-router-dom";

const Header = ({ onFilterChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");
    const urlSortOrder = searchParams.get("sortOrder");

    if (urlMinPrice) setMinPrice(urlMinPrice);
    if (urlMaxPrice) setMaxPrice(urlMaxPrice);
    if (urlSortOrder) setSortOrder(urlSortOrder);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMinPriceChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMinPrice(value);
      validatePriceRange(value, maxPrice);
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxPrice(value);
      validatePriceRange(minPrice, value);
    }
  };

  const validatePriceRange = (min, max) => {
    if (min && max && Number(min) >= Number(max)) {
      setPriceError("Giá thấp nhất phải nhỏ hơn giá cao nhất");
    } else {
      setPriceError("");
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilter = () => {
    if (!priceError) {
      const newParams = new URLSearchParams(searchParams);

      if (minPrice) newParams.set("minPrice", minPrice);
      else newParams.delete("minPrice");

      if (maxPrice) newParams.set("maxPrice", maxPrice);
      else newParams.delete("maxPrice");

      newParams.set("sortOrder", sortOrder);

      setSearchParams(newParams);

      if (onFilterChange) {
        onFilterChange({
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          sortOrder
        });
      }

      handleClose();
    }
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("asc");
    setPriceError("");

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("minPrice");
    newParams.delete("maxPrice");
    newParams.delete("sortOrder");
    setSearchParams(newParams);

    if (onFilterChange) {
      onFilterChange({
        minPrice: undefined,
        maxPrice: undefined,
        sortOrder: "asc"
      });
    }
  };

  return (
    <Box
      sx={{
        mb: 2,
        mt: 2
      }}
    >
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleClick}
              aria-label="filter products"
              variant="outlined"
              startIcon={<FilterAltIcon />}
              sx={{
                fontSize: "14px",
                textTransform: "none",
                borderRadius: "100px",
                color: "#0396c1",
                borderColor: "#0396c1",
              }}
            >
              Lọc sản phẩm
            </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: { width: 320, padding: 2 }
            }}
          >
            <Paper elevation={0}>
              <Typography variant="subtitle1" gutterBottom>
                Khoảng giá
              </Typography>
              <Box display="flex" gap={2} mb={2}>
                <TextField
                  fullWidth
                  label="Từ"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  error={Boolean(priceError)}
                  helperText={priceError}
                  type="text"
                  size="small"
                  InputProps={{
                    endAdornment: <Typography variant="caption">đ</Typography>
                  }}
                />
                <TextField
                  fullWidth
                  label="Đến"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  error={Boolean(priceError)}
                  type="text"
                  size="small"
                  InputProps={{
                    endAdornment: <Typography variant="caption">đ</Typography>
                  }}
                />
              </Box>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  Sắp xếp theo giá
                </Typography>
                <RadioGroup value={sortOrder} onChange={handleSortChange}>
                  <FormControlLabel
                    value="asc"
                    control={<Radio />}
                    label="Tăng dần"
                  />
                  <FormControlLabel
                    value="desc"
                    control={<Radio />}
                    label="Giảm dần"
                  />
                </RadioGroup>
              </FormControl>
              <Box display="flex" gap={2} mt={2}>
                <Button
                  variant="contained"
                  onClick={handleFilter}
                  disabled={Boolean(priceError)}
                  fullWidth
                  sx={{textTransform: "none"}}
                >
                  Áp dụng
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  fullWidth
                  sx={{textTransform: "none"}}
                >
                  Đặt lại
                </Button>
              </Box>
            </Paper>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
