import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { PaletteMode } from '@mui/material';

import meWhiteLogo from '../assets/partners/me/me-transparent-white.png';
import meGreyLogo from '../assets/partners/me/me-transparent-grey.png';
import sekoWhiteLogo from '../assets/partners/seko/seko-white-transparent.png';
import sekoGreyLogo from '../assets/partners/seko/seko-grey-transparent.png';

interface OurPartnerProps {
  mode: PaletteMode;
}

const logoStyle = {
  height: '40px',
  margin: '0 32px',
};

export default function OurParterns({ mode }: OurPartnerProps) {
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
        sx={{ mt: 0.5, opacity: mode === 'light' ? 1 : 0.6 }}
      >
        <Grid>
          <img
            src={mode === 'light' ? sekoGreyLogo : sekoWhiteLogo}
            alt='me logo'
            style={logoStyle}
          />
        </Grid>
        <Grid>
          <img
            src={mode === 'light' ? meGreyLogo : meWhiteLogo}
            alt='me logo'
            style={logoStyle}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
