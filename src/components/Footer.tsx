import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Copyright() {
  return (
    <Typography variant='caption' color='text.secondary' textAlign={'center'} mt={1}>
      {'Copyright © '}
      <Link href='https://leentreprenad.se/'>LE Entreprenad&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
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
        {/* <Typography
          component='h1'
          variant='h1'
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          L.E &nbsp;
          <Typography
            component='span'
            variant='h1'
            sx={{
              mb: { xs: 2, md: 2 },
              color: (theme) =>
                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
            }}
          >
            Entreprenad
          </Typography>
        </Typography> */}
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
            onClick={() => scrollToSection('offers')}
            sx={{ cursor: 'pointer' }}
            color='text.secondary'
          >
            Erbjudande
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
            href='https://www.facebook.com/'
            aria-label='Facebook'
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color='inherit'
            href='https://www.instagram.com'
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
