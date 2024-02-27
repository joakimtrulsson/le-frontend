import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

interface ToggleLightDarkModeProps {
  mode: PaletteMode;
  toggleLightDarkMode: () => void;
}

function ToggleLightDarkMode({ mode, toggleLightDarkMode }: ToggleLightDarkModeProps) {
  return (
    <Box sx={{ maxWidth: '32px', mr: '4px' }}>
      <Button
        variant='text'
        onClick={toggleLightDarkMode}
        size='small'
        aria-label='button to toggle light/dark mode'
        sx={{ minWidth: '32px', height: '32px', p: '4px' }}
      >
        {mode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize='small' />
        ) : (
          <ModeNightRoundedIcon fontSize='small' />
        )}
      </Button>
    </Box>
  );
}

export default ToggleLightDarkMode;
