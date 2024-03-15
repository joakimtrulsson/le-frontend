import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import lightLogo from '../assets/le-high-resolution-logo-transparent-cropped.svg';
import darkLogo from '../assets/le-high-resolution-logo-transparent-cropped-footer.svg';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/system';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import { ThemeModeProps, HeroData } from '../types/';
import { Forms } from './';

import { useQuery, gql } from '@apollo/client';

const GET_HERO = gql`
  query SiteConfig {
    siteConfig {
      siteTitle
      heroPreamble {
        document
      }
      heroImage1 {
        url
      }
      heroImage2 {
        url
      }
      heroImage3 {
        url
      }
      heroImage4 {
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

export default function Hero({ mode }: ThemeModeProps) {
  const [heroData, setHeroData] = React.useState<HeroData>();
  const { data } = useQuery(GET_HERO);

  React.useEffect(() => {
    if (data) {
      const newSiteConfig: HeroData = {
        siteTitle: data.siteConfig?.siteTitle,
        heroPreamble: data.siteConfig?.heroPreamble?.document,
        heroImages: [
          data.siteConfig?.heroImage1?.url,
          data.siteConfig?.heroImage2?.url,
          data.siteConfig?.heroImage3?.url,
          data.siteConfig?.heroImage4?.url,
        ].filter(Boolean),
      };
      setHeroData(newSiteConfig);
    }
  }, [data]);

  const StyledLink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 500,
    position: 'relative',
    textDecoration: 'none',
    '&::before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: '1px',
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.primary.light,
      opacity: 0.7,
      transition: 'width 0.3s ease, opacity 0.3s ease',
    },
    '&:hover::before': {
      width: '100%',
      opacity: 1,
    },
    ...(theme.palette.mode === 'dark' && {
      color: theme.palette.primary.light,
    }),
  }));

  const renderers: DocumentRendererProps['renderers'] = {
    inline: {
      link: ({ children, href }) => {
        return (
          <StyledLink href={href} target='_blank' rel='noopener noreferrer'>
            {children}
          </StyledLink>
        );
      },
    },
  };

  return (
    <Box
      id='hero'
      sx={() => ({
        width: '100%',
        backgroundImage:
          mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1, sm: 1 },
          alignSelf: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'center' },
          pt: { xs: 12, sm: 14 },
        }}
      >
        <Box>
          <img
            src={mode === 'light' ? lightLogo : darkLogo}
            style={logoStyle}
            alt='logo of le entreprenad'
          />
        </Box>
        {heroData && (
          <Typography
            component='h1'
            variant='h5'
            sx={{
              fontFamily: 'Times New Roman, Serif',
              fontWeight: '600',
              color: 'text.secondary',
            }}
          >
            {heroData.siteTitle}
          </Typography>
        )}
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          pt: { xs: 2, sm: 4 },
          pb: { xs: 4, sm: 12 },
        }}
      >
        <Stack
          sx={{
            width: { xs: '100%', sm: '100%' },
            order: { xs: 2, sm: 2, md: 1 },
          }}
        >
          {heroData && (
            <Box color='text.secondary' sx={{ mr: { md: 3 } }}>
              <DocumentRenderer document={heroData.heroPreamble} renderers={renderers} />
            </Box>
          )}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf='center'
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Forms mode={mode} />
          </Stack>
        </Stack>
        {heroData && (
          <Carousel
            autoPlay={true}
            navButtonsAlwaysVisible
            indicators={false}
            sx={{
              mt: { xs: 2, sm: 1, md: 0 },
              mb: { xs: 1, sm: 2, md: 0 },
              width: '100%',
              borderRadius: '10px',
              outline: '1px solid',
              outlineColor: alpha('#9CCCFC', 0.1),
              boxShadow: `0 0 24px 12px ${alpha('#033363', 0.3)}`,
              order: { xs: 1, sm: 1, md: 2 },
            }}
          >
            {heroData.heroImages.map((imageUrl, index) => (
              <Box
                key={index}
                id={`hero-image-${index}`}
                sx={{
                  height: { xs: 250, sm: 500 },
                  backgroundImage: imageUrl ? `url(${imageUrl})` : '',
                  backgroundSize: 'cover',
                  borderRadius: '10px',
                }}
              />
            ))}
          </Carousel>
        )}
      </Container>
    </Box>
  );
}
