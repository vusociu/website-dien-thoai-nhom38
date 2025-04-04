import Box from '@mui/material/Box';
import ModeToggle from '../../components/ModeToggle/index.jsx';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Account from './account.jsx';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function AppBar() {
    return (
    <Box px={2} sx={{
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : ''),
        borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`, 
    }}>
    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
    <SmartphoneIcon sx={{ color: 'primary.main'}} />
    <Typography sx= {{fontWeight : 'bold', fontSize :'1.2rem', color: 'primary.main'}}>Project</Typography>
    </Box>

    <Box sx={{
        width: 500,
        maxWidth: '100%',
        '& .MuiOutlinedInput-root': {
        '& fieldset' :{borderColor: 'primary.main'},
        '&:hover fieldset': {borderColor: 'primary.main'},
        '&.Mui-focused fieldset': {borderColor: 'primary.main'},
        },
      }}>
    <TextField 
    id="outlined-search" 
    // label="" 
    type="search" 
    size='small'  
    fullWidth
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{color: 'primary.main'}}/>
        </InputAdornment>
      ),
    }}  />
    </Box>

    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
    <ModeToggle/>
    <Tooltip title="Notifications">
    <IconButton>
    <Badge color="" variant="dot" >
      <ShoppingCartIcon sx={{color: 'primary.main'}}/>
    </Badge>
    </IconButton>
    </Tooltip>
    <Account/>
    </Box>
    </Box>
    );
  }

export default AppBar;
