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

function AppBar() {
    return (
    <Box px={2} sx={{
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
    <SmartphoneIcon sx={{ color: 'primary.main'}} />
    <Typography sx= {{fontWeight : 'bold', fontSize :'1.2rem', color: 'primary.main'}}>Project</Typography>
    </Box>

    <Box sx={{
        width: 500,
        maxWidth: '100%',
      }}>
    <TextField id="outlined-search" label="Search..." type="search" size='small'  fullWidth  />
    </Box>

    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
    <ModeToggle/>
    <Tooltip title="Notifications">
    <IconButton>
    <Badge color="secondary" variant="dot" >
      <ShoppingCartIcon />
    </Badge>
    </IconButton>
    </Tooltip>
    <Account/>
    </Box>
    </Box>
    );
  }

export default AppBar;
