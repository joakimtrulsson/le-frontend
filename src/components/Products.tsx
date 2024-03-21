import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import useCartStore from '../store/cart';
import { Product } from '../types/';

import { ProductCard } from './';

import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';

export default function Products() {
  const { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      where: {
        status: {
          equals: 'published',
        },
      },
    },
  });
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();
  const { addItemToCart } = useCartStore();

  React.useEffect(() => {
    if (data) {
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
          {loading ? (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <CircularProgress />
            </Grid>
          ) : (
            data?.products.map((product: Product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} onAddToCart={addItemToCart} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
