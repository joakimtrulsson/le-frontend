import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import useCartStore from '../store/cart';
import { Product } from '../types/';

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
    }
    siteConfig {
      productsPreamble {
        document
      }
    }
  }
`;

export default function Products() {
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      where: {
        status: {
          equals: 'published',
        },
      },
    },
  });
  const [products, setProducts] = React.useState<Product[]>([]);
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();
  const { addItemToCart } = useCartStore();

  React.useEffect(() => {
    if (data) {
      setProducts(data.products);
      setPreamble(data.siteConfig.productsPreamble.document);
    }
  }, [data]);

  const onAddToCart = (product: Product) => {
    addItemToCart(product);
  };

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
          <Typography
            fontFamily='Times New Roman, serif'
            textAlign='center'
            component='h2'
            variant='h4'
          >
            Våra produkter
          </Typography>
          <Box sx={{ color: 'grey.400' }}>
            {preamble && <DocumentRenderer document={preamble} />}
          </Box>
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
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    // alignSelf: 'center',
                    height: { xs: 250, sm: 275 },
                    width: '100%',
                    backgroundImage: item.productImage
                      ? `url(${item.productImage.url})`
                      : '',
                    backgroundSize: 'cover',
                  }}
                >
                  <Button
                    size='small'
                    variant='contained'
                    color='primary'
                    sx={{ mb: 1, mr: 1 }}
                    onClick={() => onAddToCart(item)}
                  >
                    Lägg till i varukorg
                  </Button>
                </Box>
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
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.discountPrice ? (
                    <>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'grey.400',
                          fontWeight: 'bold',
                          textDecoration: 'line-through',
                        }}
                      >
                        Pris: {item.price}kr
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'red',
                          fontWeight: 'bold',
                          marginLeft: '10px',
                        }}
                      >
                        Nu: {item.discountPrice}kr
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant='body2'
                      sx={{
                        color: 'grey.400',
                        fontWeight: 'bold',
                      }}
                    >
                      Pris: {item.price}kr
                    </Typography>
                  )}
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
