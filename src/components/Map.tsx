import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { TileLayer, ZoomControl, MapContainer, Marker, Popup } from 'react-leaflet';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import styled, { createGlobalStyle } from 'styled-components';

import { useQuery, gql } from '@apollo/client';

const GET_PREAMBLE = gql`
  query SiteConfig {
    siteConfig {
      ourLocationPreamble {
        document
      }
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  .leaflet-popup-content-wrapper {
    color: #fff;
    background-color: #303030 !important;
    padding: 10px;
    border-radius: 10px;
    height: "100%";
    width: auto;
  
  }

  .leaflet-popup-tip {
    background-color: #303030 !important;
  
}
`;

const StyledMapContainer = styled(MapContainer)`
  height: 300px;

  padding: 0;
  border-radius: 12px;
  border: '1px solid';
  border-color: '#121b21';

  .leaflet-tile {
    filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3)
      brightness(0.7);
  }

  .leaflet-container {
    background: #303030;
  }
`;

const Map = () => {
  const { data } = useQuery(GET_PREAMBLE);
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();

  React.useEffect(() => {
    if (data) {
      setPreamble(data.siteConfig.ourLocationPreamble.document);
    }
  }, [data]);

  return (
    <Box
      id='map'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '100%' },

            textAlign: 'center',
          }}
        >
          <Typography
            fontFamily='Times New Roman, serif'
            textAlign='center'
            component='h2'
            variant='h4'
          >
            Var finns vi?
          </Typography>
          <Box sx={{ color: 'grey.400', mb: { xs: 1, sm: 2 } }}>
            {preamble && <DocumentRenderer document={preamble} />}
          </Box>

          <GlobalStyle />
          <StyledMapContainer
            center={[55.384248, 13.139789]}
            zoom={16}
            zoomControl={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <ZoomControl position='topright' />
            <Marker position={[55.384248, 13.139789]}>
              <Popup>
                Välkommen att besöka oss! <br /> 1234 Main St, Springfield, IL 62701
              </Popup>
            </Marker>
          </StyledMapContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default Map;
