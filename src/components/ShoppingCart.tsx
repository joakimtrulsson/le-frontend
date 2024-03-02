import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { ShoppingBag } from '@mui/icons-material';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import useCartStore from '../store/cart';
import { Checkout } from './';

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -1,
    top: 0,
  },
}));

function ShoppingCart() {
  const [open, setOpen] = React.useState(false);

  const { increaseQuantity, decreaseQuantity, cartItems, removeItemFromCart } =
    useCartStore();

  const onIncreaseQuantity = (productId: string) => {
    increaseQuantity(productId);
  };

  const onDecreaseQuantity = (productId: string) => {
    decreaseQuantity(productId);
  };

  const onRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <AppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container>
          <Toolbar
            variant='regular'
            sx={(theme) => ({
              position: 'fixed',
              bottom: 20,
              left: 0,
              right: 0,
              margin: 'auto',
              width: '68px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box>
              <IconButton
                aria-label='cart'
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <StyledBadge badgeContent={totalQuantity} color='primary'>
                  <ShoppingBag />
                </StyledBadge>
              </IconButton>
              <Drawer anchor='bottom' open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  ></Box>
                  <List>
                    {cartItems.length > 0 ? (
                      <>
                        <List>
                          {cartItems.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={item.productTitle}
                                // secondary={item.description}
                              />
                              <Typography variant='body2' color='text.secondary'>
                                {item.price * item.quantity} kr
                              </Typography>
                              <IconButton
                                onClick={() => onDecreaseQuantity(item.id)}
                                aria-label='decrease'
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography variant='body2' color='text.secondary'>
                                {item.quantity} st
                              </Typography>
                              <IconButton
                                onClick={() => onIncreaseQuantity(item.id)}
                                aria-label='increase'
                              >
                                <AddIcon />
                              </IconButton>
                              <ListItemSecondaryAction>
                                <IconButton
                                  onClick={() => onRemoveItem(item.id)}
                                  edge='end'
                                  aria-label='delete'
                                >
                                  <RemoveCircleOutlineIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                          <Checkout />
                        </Box>
                      </>
                    ) : (
                      <Typography variant='body1' align='center' color='textSecondary'>
                        Din varukorg är tom
                      </Typography>
                    )}
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default ShoppingCart;
