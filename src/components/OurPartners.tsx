import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import meWhiteLogo from '../assets/partners/me/me-transparent-white.png';
import meGreyLogo from '../assets/partners/me/me-transparent-grey.png';
import sekoWhiteLogo from '../assets/partners/seko/seko-white-transparent.png';
import sekoGreyLogo from '../assets/partners/seko/seko-grey-transparent.png';
import idGreyLogo from '../assets/partners/id06/id06-grey.png';
import idWhiteLogo from '../assets/partners/id06/id06-white.png';
import energyWhiteLogo from '../assets/partners/energi/energi-white.png';
import energyGreyLogo from '../assets/partners/energi/energi-grey.png';
import prestoWhiteLogo from '../assets/partners/presto/presto-transparent-white.png';
import prestoGreyLogo from '../assets/partners/presto/presto-transparent-grey.png';
import ThemeModeProps from '../types/ThemeModeProps';

const logoStyle = {
  height: '40px',
  width: '120px',
  margin: '0 32px',
};

const logoStyleID06 = {
  height: '45px',
  margin: '0 32px',
};

export default function OurParterns({ mode }: ThemeModeProps) {
  return (
    <Box id='ourpartners' sx={{ py: 4 }}>
      <Typography
        component='p'
        variant='subtitle2'
        align='center'
        color='text.secondary'
        mb='12px'
      >
        Våra avtal & certifieringar
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ mt: 0.5, opacity: mode === 'light' ? 1 : 0.6, flexWrap: 'wrap' }}
      >
        <Grid item sx={{ p: 1 }}>
          <img
            src={mode === 'light' ? sekoGreyLogo : sekoWhiteLogo}
            alt='seko logo'
            style={logoStyle}
          />
        </Grid>
        <Grid item sx={{ p: 1 }}>
          <img
            src={mode === 'light' ? meGreyLogo : meWhiteLogo}
            alt='me logo'
            style={logoStyle}
          />
        </Grid>
        <Grid item sx={{ p: 1 }}>
          <img
            src={mode === 'light' ? energyGreyLogo : energyWhiteLogo}
            alt='energiföretagen logo'
            style={logoStyle}
          />
        </Grid>
        <Grid item sx={{ p: 1 }}>
          <img
            src={mode === 'light' ? prestoGreyLogo : prestoWhiteLogo}
            alt='presto logo'
            style={logoStyle}
          />
        </Grid>
        <Grid item sx={{ p: 1 }}>
          <img
            src={mode === 'light' ? idGreyLogo : idWhiteLogo}
            alt='id06 logo'
            style={logoStyleID06}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
