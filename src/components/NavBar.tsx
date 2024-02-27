import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleLightDarkMode from './ToggleLightDarkMode';

// const logoStyle = {
//   width: '140px',
//   height: 'auto',
//   cursor: 'pointer',
// };

interface NavBarProps {
  mode: PaletteMode;
  toggleLightDarkMode: () => void;
}

function NavBar({ mode, toggleLightDarkMode }: NavBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar
            variant='regular'
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Typography
                variant='h6'
                color='text.primary'
                sx={{ fontWeight: 700, cursor: 'pointer', marginLeft: '12px' }}
              >
                L.E
              </Typography>
              {/* <img
                src={
                  'www.url.to.logo.png'
                }
                style={logoStyle}
                alt="logo of LE's website"
              /> */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('projects')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant='body2' color='text.primary'>
                    Våra projekt
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('reviews')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant='body2' color='text.primary'>
                    Omdömen
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('services')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant='body2' color='text.primary'>
                    Tjänster
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('products')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant='body2' color='text.primary'>
                    Produkter
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('offers')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant='body2' color='text.primary'>
                    Erbjudande
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleLightDarkMode
                mode={mode}
                toggleLightDarkMode={toggleLightDarkMode}
              />
              <Button
                color='primary'
                variant='contained'
                size='small'
                component='a'
                href='/material-ui/getting-started/templates/sign-up/'
                target='_blank'
              >
                Kontakta oss
              </Button>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant='text'
                color='primary'
                aria-label='menu'
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleLightDarkMode
                      mode={mode}
                      toggleLightDarkMode={toggleLightDarkMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection('products')}>
                    Produkter
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('services')}>
                    Våra tjänster
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('projects')}>
                    Våra projekt
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('offers')}>
                    Erbjudande
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Button
                      color='primary'
                      variant='contained'
                      component='a'
                      href='/material-ui/getting-started/templates/sign-up/'
                      target='_blank'
                      sx={{ width: '100%' }}
                    >
                      Kontakta oss
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
