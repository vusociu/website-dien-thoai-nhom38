import Button from '@mui/material/Button';
import { useColorScheme } from '@mui/material/styles';


function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    return (
      <Button variant="outlined" size="small"
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    );
  }

export default ModeToggle;
