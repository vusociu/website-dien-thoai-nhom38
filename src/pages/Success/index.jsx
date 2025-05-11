import { 
    Box,
    Button,
    Typography,
    Container,
    Paper,
    Stack,
    Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Success = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 10 }}>
        <Container maxWidth="sm">
            <Paper  
                sx={{
                    p: 4,
                    bgcolor: "#e6f3ea",
                    textAlign: "center",
                    borderRadius: 2
                }}
            >
                <CheckCircleOutlineIcon 
                    color="success" 
                    sx={{ 
                        fontSize: 80,
                        mb: 2
                    }} 
                />
                
                <Typography variant="h4" gutterBottom color="success.main" fontWeight="bold">
                    Đặt hàng thành công!
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng và sẽ xử lý trong thời gian sớm nhất.
                </Typography>
                
                <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    spacing={2}
                    justifyContent="center"
                >
                    <Button 
                        variant="contained" 
                        color="primary"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate("/")}
                        fullWidth
                    >
                        Tiếp tục mua sắm
                    </Button>
                    
                    {/* <Button 
                        variant="outlined" 
                        color="primary"
                        startIcon={<ReceiptIcon />}
                        onClick={() => navigate("/order")}
                        fullWidth
                        sx={{bgcolor: "#fff"}}
                    >
                        Xem đơn hàng
                    </Button> */}
                </Stack>
            </Paper>
        </Container>
    </Box>
  );
};

export default Success;
