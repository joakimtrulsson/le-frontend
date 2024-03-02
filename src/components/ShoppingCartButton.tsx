import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingCart } from './';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function ShoppingCartButton() {
  const [openCart, setOpenCart] = React.useState(true);

  const openCartHandler = () => {
    setOpenCart((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <IconButton
        onClick={openCartHandler}
        sx={{ height: '56px', width: '56px', backgroundColor: 'background.default' }}
        aria-label='cart'
      >
        <StyledBadge badgeContent={4} color='secondary'>
          <ShoppingCartIcon fontSize='large' color='primary' />
        </StyledBadge>
      </IconButton>
      {openCart && <ShoppingCart />}
    </Box>
  );
}

export default ShoppingCartButton;
