import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';

import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query Query($where: ProductWhereInput!) {
    products(where: $where) {
      id
      productTitle
      description
      price
      priceUnit
      productImage {
        url
      }
      discountPrice
      recommendedProduct
    }
    siteConfig {
      productsPreamble {
        document
      }
    }
  }
`;

interface Product {
  id: string;
  productTitle: string;
  description: string;
  price: number;
  priceUnit: string;
  productImage: {
    url: string;
  };
  discountPrice: number;
  recommendedProduct: boolean;
}

export default function Products() {
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      where: {
        status: {
          equals: 'published',
        },
        AND: [
          {
            discountPrice: {
              equals: null,
            },
          },
        ],
      },
    },
  });
  const [products, setProducts] = React.useState<Product[]>([]);
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();

  React.useEffect(() => {
    if (data) {
      setProducts(data.products);
      setPreamble(data.siteConfig.productsPreamble.document);
    }
  }, [data]);

  return (
    <Box
      id='products'
      sx={{
        pt: { xs: 3, sm: 8 },
        pb: { xs: 6, sm: 8 },
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
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography textAlign='center' component='h2' variant='h4'>
            Våra produkter
          </Typography>
          <Typography variant='body1' sx={{ color: 'grey.400' }}>
            {preamble && <DocumentRenderer document={preamble} />}
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {products.map((item: Product, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction='column'
                color='inherit'
                component={Card}
                useFlexGap
                sx={{
                  minHeight: { xs: 400, sm: 475 },
                  border: '1px solid',
                  borderColor: '#32383f',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box
                  id='image'
                  sx={{
                    alignSelf: 'center',
                    height: { xs: 250, sm: 275 },
                    width: '100%',
                    backgroundImage: item.productImage
                      ? `url(${item.productImage.url})`
                      : '',
                    backgroundSize: 'cover',
                  }}
                />
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography component='h3' variant='h6' gutterBottom>
                    {item.productTitle}
                  </Typography>
                  <Typography variant='body1' gutterBottom sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: '#32383f', marginTop: 'auto' }} />
                <Box
                  sx={{
                    px: 2,

                    backgroundColor: '#161a1c',
                    height: '36px',
                    display: 'flex',

                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'grey.400',
                      fontWeight: 'bold',
                    }}
                  >
                    Pris: {item.price}kr
                  </Typography>
                  <Divider
                    orientation='vertical'
                    sx={{ mx: 1, color: '#32383f', height: '50%' }}
                  />
                  <Typography
                    variant='body2'
                    sx={{
                      color: 'grey.400',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.priceUnit === 'perkubik'
                      ? 'per kubik'
                      : item.priceUnit === 'perstk'
                      ? 'per styck'
                      : item.priceUnit === 'perkvm'
                      ? 'per kvm²'
                      : item.priceUnit}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
