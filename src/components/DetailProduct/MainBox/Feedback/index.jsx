import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';

function Feedback() {
    const [openDialog, setOpenDialog] = React.useState(false); // Trạng thái mở/đóng dialog
    const [reviews, setReviews] = React.useState([]); // Danh sách đánh giá
    const [user, setUser] = React.useState({ name: '', avatar: '' }); // Thông tin người dùng
    const [newReview, setNewReview] = React.useState({
        rating: 0,
        comment: '',
    });

    // Hàm mở dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewReview({
            rating: 0,
            comment: '',
        });
    };

    // Hàm lưu đánh giá
    const handleSaveReview = async () => {
        try {
            const response = await fetch(
                'https://api.example.com/products/:productId/reviews', // Thay bằng URL API thực tế
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rating: newReview.rating,
                        comment: newReview.comment,
                        userId: user.id, // Nếu cần gửi ID người dùng
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save review');
            }

            const savedReview = await response.json();
            setReviews([...reviews, savedReview]); // Cập nhật danh sách đánh giá
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving review:', error);
        }
    };

    // Gọi API để lấy thông tin người dùng
    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://api.example.com/user'); // Thay bằng URL API thực tế
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser({ name: data.name, avatar: data.avatar });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Gọi API để lấy danh sách đánh giá
    React.useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    'https://api.example.com/products/:productId/reviews' // Thay bằng URL API thực tế
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <Box
            sx={{
                padding: 2,
                mr: 2,
                height: '800px',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflowY: 'auto',
            }}
        >
            {/* Nút tạo đánh giá */}
            <Button
                variant="contained"
                onClick={handleOpenDialog}
                sx={{ mb: 2 }}
            >
                Tạo đánh giá
            </Button>

            <Typography variant="h6" sx={{ mb: 2 }}>
                Đánh giá sản phẩm
            </Typography>

            {/* Danh sách đánh giá */}
            {reviews.map((review, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        mb: 2,
                        borderBottom: '1px solid #ccc',
                        pb: 2,
                    }}
                >
                    {/* Avatar */}
                    <Avatar
                        src={review.avatar}
                        sx={{ bgcolor: 'primary.main', mr: 2, width: 48, height: 48 }}
                    >
                        {review.name.charAt(0).toUpperCase()}
                    </Avatar>

                    {/* Nội dung đánh giá */}
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {review.name}
                        </Typography>
                        <Rating
                            value={review.rating}
                            readOnly
                            precision={0.5}
                            sx={{ mb: 1 }}
                        />
                        <Typography sx={{ fontSize: '14px', color: '#555' }}>
                            {review.comment}
                        </Typography>
                    </Box>
                </Box>
            ))}

            {/* Dialog tạo đánh giá */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Tạo đánh giá</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2 }}>
                        <strong>Tên:</strong> {user.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={user.avatar}
                            sx={{ bgcolor: 'primary.main', mr: 2 }}
                        />
                        <Typography>{user.name}</Typography>
                    </Box>
                    <Typography component="legend">Đánh giá</Typography>
                    <Rating
                        value={newReview.rating}
                        onChange={(e, newValue) =>
                            setNewReview({ ...newReview, rating: newValue })
                        }
                        precision={0.5}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Bình luận"
                        fullWidth
                        multiline
                        rows={4}
                        value={newReview.comment}
                        onChange={(e) =>
                            setNewReview({
                                ...newReview,
                                comment: e.target.value,
                            })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveReview}
                        disabled={!newReview.rating || !newReview.comment}>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Feedback;