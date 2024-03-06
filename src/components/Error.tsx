import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function Error() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    window.history.replaceState({}, document.title, window.location.origin);

    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Något gick fel!</DialogTitle>
        <DialogContent>
          <DialogContentText>Vänligen försök igen.</DialogContentText>
        </DialogContent>

        <DialogActions onClick={handleClose} sx={{ px: 2 }}>
          <Button variant='outlined' size='small' onClick={handleClose}>
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
