import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
// import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Product } from '../types/';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Stack
      direction='column'
      color='inherit'
      component={Card}
      useFlexGap
      sx={{
        minHeight: { xs: 400, sm: 475 },
        border: '1px solid',
        borderColor: 'primary.dark',
        background: 'none',
        backgroundColor: 'grey.900',
        '&:hover': {
          borderColor: 'primary.main',
          '& .product-divider': {
            borderColor: 'primary.main',
          },
        },
      }}
    >
      <Box
        id='image'
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          height: { xs: 250, sm: 275 },
          // width: '100%',
          borderRadius: '10px',
          backgroundImage: product.productImage ? `url(${product.productImage.url})` : '',
          backgroundSize: 'cover',
          m: 2,
        }}
      >
        <Button
          size='small'
          variant='contained'
          color='primary'
          sx={{ mb: 1, mr: 1 }}
          onClick={() => onAddToCart(product)}
        >
          Lägg till i varukorg
        </Button>
      </Box>
      <Box sx={{ px: 2, py: 0 }}>
        <Typography component='h3' variant='h6'>
          {product.productTitle}
        </Typography>
        <Typography variant='body2' gutterBottom sx={{ color: 'grey.400' }}>
          {product.description}
        </Typography>
      </Box>

      <Divider
        className='product-divider'
        sx={{
          borderColor: 'primary.dark',
          marginTop: 'auto',
        }}
      />
      <Box
        sx={{
          px: 2,
          height: '36px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {product.discountPrice ? (
          <>
            <Typography
              variant='body2'
              sx={{
                color: 'grey.400',
                fontWeight: 'bold',
                textDecoration: 'line-through',
              }}
            >
              Pris: {product.price}kr
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: 'red',
                fontWeight: 'bold',
                marginLeft: '10px',
              }}
            >
              Nu: {product.discountPrice}kr
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
            Pris: {product.price}kr
          </Typography>
        )}
        <Divider
          className='product-divider'
          orientation='vertical'
          sx={{ mx: 1, borderColor: 'primary.dark', height: '50%' }}
        />
        <Typography
          variant='body2'
          sx={{
            color: 'grey.400',
            fontWeight: 'bold',
          }}
        >
          {product.priceUnit === 'perkubik'
            ? 'per kubik'
            : product.priceUnit === 'perstk'
            ? 'per styck'
            : product.priceUnit === 'perkvm'
            ? 'per kvm²'
            : product.priceUnit}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ProductCard;
