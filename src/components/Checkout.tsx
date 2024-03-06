import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import useCartStore from '../store/cart';
import { ThemeModeProps } from '../types/';

function Checkout({ mode }: ThemeModeProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const { cartItems } = useCartStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as FormData).entries());
    const CHECKOUT_URL = import.meta.env.VITE_CHECKOUT_URL;
    const CHECKOUT_TOKEN = import.meta.env.VITE_CHECKOUT_TOKEN;

    const order = {
      products: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      customerData: formJson,
    };

    try {
      const response = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CHECKOUT_TOKEN}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        console.log(response);
        setErrorAlert(true);
        throw new Error('Något gick fel vid beställningen. Försök igen.');
      }

      const data = await response.json();

      window.location.href = data.session.url;
    } catch (error) {
      console.error('Error:', error);
      setErrorAlert(true);
    } finally {
      setLoading(false);
      setErrorAlert(false);
    }
  };

  return (
    <>
      <Button variant='outlined' size='small' onClick={handleClickOpen}>
        Checkout
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => handleSubmit(event),
        }}
      >
        <DialogTitle>Checkout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fyll i dina uppgifter för att slutföra köpet.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='customerName'
            name='customerName'
            label='Ditt namn'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='customerEmail'
            name='customerEmail'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='number'
            name='number'
            label='Telefonnummer'
            type='number'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button size='small' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            size='small'
            type='submit'
            // onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition='end'
            variant='contained'
            color='primary'
          >
            <span>Gå vidare till betalningen</span>
          </LoadingButton>
        </DialogActions>
        <Stack sx={{ px: 2, py: 1, width: '100%' }} spacing={2}>
          {errorAlert && (
            <Alert
              sx={{
                border: '1px solid #ef5351',
                color: '#ef5351',
                bgcolor: mode === 'light' ? '#fff' : '',
              }}
              severity='error'
            >
              Något gick fel! Försök igen.
            </Alert>
          )}

          {loading && (
            <Alert
              sx={{
                border: '1px solid #65c364',
                color: '#65c364',
                bgcolor: mode === 'light' ? '#fff' : '',
              }}
              severity='success'
            >
              Du skickas snart vidare till Stripe för betalning.
            </Alert>
          )}
        </Stack>
      </Dialog>
    </>
  );
}

export default Checkout;
