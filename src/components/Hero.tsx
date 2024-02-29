import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import lightLogo from '../assets/le-high-resolution-logo-transparent-cropped.svg';
import darkLogo from '../assets/le-high-resolution-logo-transparent-cropped-footer.svg';
import { PaletteMode } from '@mui/material';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';

import { useQuery, gql } from '@apollo/client';

interface HeroProps {
  mode: PaletteMode;
}

const GET_HERO = gql`
  query SiteConfig {
    siteConfig {
      siteTitle
      heroPreamble {
        document
      }
      heroImage {
        url
      }
    }
  }
`;

const logoStyle = {
  width: '72px',
  height: 'auto',
  cursor: 'pointer',
  fontColor: 'red',
};

export default function Hero({ mode }: HeroProps) {
  const { data } = useQuery(GET_HERO);
  const [tempSiteConfig, setTempSiteConfig] = React.useState<{
    siteTitle: string;
    heroPreamble: DocumentRendererProps['document'];
    heroImage: string;
  } | null>(null);

  React.useEffect(() => {
    if (data) {
      const newSiteConfig = {
        siteTitle: data.siteConfig?.siteTitle,
        heroPreamble: data.siteConfig?.heroPreamble?.document,
        heroImage: data.siteConfig?.heroImage?.url,
      };
      setTempSiteConfig(newSiteConfig);
    }
  }, [data]);

  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            <Box>
              <img
                src={mode === 'light' ? lightLogo : darkLogo}
                style={logoStyle}
                alt='logo of le entreprenad'
              />
            </Box>
            {
              tempSiteConfig && (
                <Typography
                  variant='h5'
                  sx={{
                    // ml: 0,
                    // alignSelf: 'center',
                    fontFamily: 'Times New Roman, Serif',
                    fontWeight: '600',

                    color: 'text.secondary',
                  }}
                >
                  Entreprenad & Byggservice
                </Typography>
              )
              // tempSiteConfig.siteTitle.split(' ').map((word, index, arr) => (
              //   <Typography
              //     key={index}
              //     component='h1'
              //     variant='h2'
              //     sx={{
              //       alignSelf: 'center',
              //       fontFamily: 'Times New Roman, Serif',
              //       color:
              //         index === arr.length - 1
              //           ? (theme) =>
              //               theme.palette.mode === 'light'
              //                 ? 'primary.main'
              //                 : 'primary.light'
              //           : 'inherit',
              //       marginRight:
              //         index !== arr.length - 1 ? { xs: '0em', sm: '0.2em' } : '0',
              //     }}
              //   >
              //     {word}
              //   </Typography>
              // )

              // )
            }
          </Box>

          {tempSiteConfig && (
            <Box color='text.secondary'>
              <DocumentRenderer document={tempSiteConfig.heroPreamble} />
            </Box>
          )}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf='center'
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button variant='contained' color='primary'>
              Kontakta oss
            </Button>
          </Stack>
        </Stack>
        {tempSiteConfig && (
          <Box
            id='image'
            sx={(theme) => ({
              mt: { xs: 6, sm: 8 },
              alignSelf: 'center',
              height: { xs: 250, sm: 700 },
              width: '100%',
              backgroundImage: tempSiteConfig ? `url(${tempSiteConfig.heroImage})` : '',
              backgroundSize: 'cover',
              borderRadius: '10px',
              outline: '1px solid',
              outlineColor:
                theme.palette.mode === 'light'
                  ? alpha('#BFCCD9', 0.5)
                  : alpha('#9CCCFC', 0.1),
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                  : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
            })}
          />
        )}
      </Container>
    </Box>
  );
}
