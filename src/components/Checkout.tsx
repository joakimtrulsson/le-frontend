import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Checkout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' size='small' onClick={handleClickOpen}>
        Checkout
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // const formJson = Object.fromEntries((formData as any).entries());

            alert('To be implemented');
            handleClose();
          },
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
            id='name'
            name='name'
            label='Ditt namn'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='email'
            name='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='email'
            name='email'
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
          <Button size='small' variant='contained' type='submit'>
            Gå vidare till betalning
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Checkout;
