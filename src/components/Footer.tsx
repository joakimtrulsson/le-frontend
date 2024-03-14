import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import lightLogo from '../assets/le-high-resolution-logo-transparent-cropped.svg';
import darkLogo from '../assets/le-high-resolution-logo-transparent-cropped-footer.svg';
import { ThemeModeProps } from '../types/';

function Copyright() {
  return (
    <Typography variant='caption' color='text.secondary' textAlign={'center'} mt={1}>
      {'Copyright © '}
      <Link href='https://leentreprenad.se/'>LE Entreprenad&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const logoStyle = {
  width: '56px',
  height: 'auto',
  cursor: 'pointer',
  fontColor: 'red',
};

export default function Footer({ mode }: ThemeModeProps) {
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 50;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 2, sm: 2 },
        py: { xs: 8, sm: 8 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'coloumn' },
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img
            src={mode === 'light' ? lightLogo : darkLogo}
            style={logoStyle}
            alt='logo of le entreprenad'
          />
          <Typography
            sx={{
              ml: 1,
              alignSelf: 'center',
              fontFamily: 'Times New Roman, Serif',
              fontWeight: '600',
              color: 'text.secondary',
            }}
          >
            Entreprenad & Byggservice
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <Link
            onClick={() => scrollToSection('products')}
            sx={{ cursor: 'pointer' }}
            color='text.secondary'
          >
            Produkter
          </Link>

          <Link
            onClick={() => scrollToSection('projects')}
            sx={{ cursor: 'pointer' }}
            color='text.secondary'
          >
            Våra projekt
          </Link>
          <Link
            onClick={() => scrollToSection('services')}
            sx={{ cursor: 'pointer' }}
            color='text.secondary'
          >
            Våra tjänster
          </Link>
          <Link
            onClick={() => scrollToSection('reviews')}
            sx={{ cursor: 'pointer' }}
            color='text.secondary'
          >
            Omdömen
          </Link>
          <Link
            onClick={() => scrollToSection('map')}
            sx={{ cursor: 'pointer' }}
            color='text.secondary'
          >
            Var finns vi?
          </Link>
          <Link sx={{ cursor: 'pointer' }} color='text.secondary'>
            Kontakta oss
          </Link>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          width: '100%',
        }}
      >
        <Stack
          direction='row'
          sx={{
            color: 'text.secondary',
            mb: 2,
          }}
        >
          <IconButton
            color='inherit'
            href='https://www.facebook.com/L.EEntreprenadByggservice/'
            aria-label='Facebook'
            target='_blank'
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color='inherit'
            href='https://www.instagram.com/l.eentreprenadochbyggservice/'
            aria-label='Instagram'
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color='inherit'
            href='https://www.linkedin.com/'
            aria-label='LinkedIn'
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>

        <Box>
          <Link color='text.secondary' href='mailto:l.e.trelleborg@outlook.com'>
            l.e.trelleborg@outlook.com
          </Link>
          <Typography display='inline' sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color='text.secondary' href='tel:0701234567'>
            070-123 45 67
          </Link>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
