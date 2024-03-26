import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DocumentRenderer, DocumentRendererProps } from '@keystone-6/document-renderer';
import { Product, SortOrder } from '../types/';
import { ProductCard } from './';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_PRODUCT_CATEGORIES } from '../graphql/queries';

export default function Products() {
  const [sort, setSort] = React.useState<SortOrder>('asc');
  const [filter, setFilter] = React.useState<string>('Alla');
  const { data: categoriesData } = useQuery(GET_PRODUCT_CATEGORIES);
  const { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      where: {
        status: {
          equals: 'published',
        },
        ...(filter !== 'Alla' && {
          productCategory: { categoryTitle: { equals: filter } },
        }),
      },
      orderBy: getOrderByValue(sort),
    },
  });
  const [preamble, setPreamble] = React.useState<DocumentRendererProps['document']>();

  React.useEffect(() => {
    if (data) {
      setPreamble(data.siteConfig.productsPreamble.document);
    }
  }, [data]);

  function getOrderByValue(sort: string) {
    if (sort === 'asc') {
      return [{ discountPrice: 'asc' }, { price: 'asc' }];
    } else {
      return [{ discountPrice: 'desc' }, { price: 'desc' }];
    }
  }

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: { xs: 'center', sm: 'center', md: 'flex-end' },
            gap: 2,
            mb: { xs: -1, sm: -4, md: -4 },
          }}
        >
          <Box>
            <Autocomplete
              sx={{
                alignSelf: { xs: 'flex-end', sm: 'flex-end' },
              }}
              disablePortal
              size='small'
              value={filter}
              onChange={(_, newValue) => setFilter(newValue)}
              options={[
                'Alla',
                ...(categoriesData?.productCategories
                  ? categoriesData.productCategories.map(
                      (category: { categoryTitle: string }) => category.categoryTitle
                    )
                  : []),
              ]}
              renderInput={(params) => (
                <TextField
                  variant='outlined'
                  color='secondary'
                  {...params}
                  label='Filtrera efter kategori'
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: 'grey.400', mr: 1 }}>Sortera efter pris:</Typography>
            <ButtonGroup variant='contained'>
              <Button
                onClick={() => setSort('asc')}
                endIcon={<ArrowUpwardIcon />}
                size='small'
                variant={sort === 'asc' ? 'outlined' : 'contained'}
              >
                Stigande
              </Button>
              <Button
                onClick={() => setSort('desc')}
                endIcon={<ArrowDownwardIcon />}
                size='small'
                variant={sort === 'desc' ? 'outlined' : 'contained'}
              >
                Fallande
              </Button>
            </ButtonGroup>
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
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
