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
import ThemeModeProps from '../types/ThemeModeProps';

export default function FormDialog({ mode }: ThemeModeProps) {
  const [open, setOpen] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorAlert(false);
    setSuccessAlert(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Kontakta oss
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setLoading(true);

            try {
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as FormData).entries());

              const apiUrl = import.meta.env.VITE_API_EMAIL_URL;

              const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
              });

              const data = await response.json();

              if (!data.success) {
                setErrorAlert(true);
                console.log(data);
                return;
              }

              if (data.success) {
                setSuccessAlert(true);
              }
            } catch (error) {
              console.error(error);
              setErrorAlert(true);
            } finally {
              setLoading(false);
            }
          },
        }}
      >
        <DialogTitle>Kontakta oss</DialogTitle>
        <DialogContent>
          <DialogContentText>
            För att kontakta oss, vänligen fyll i formuläret nedan med din e-postadress
            och meddelande. Vi återkommer till dig så snart som möjligt.
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
            name='contactEmail'
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
            name='phoneNr'
            label='Ditt telefonnummer'
            type='number'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='message'
            name='message'
            label='Ditt meddelande'
            type='text'
            fullWidth
            variant='standard'
            multiline={true}
            minRows={3}
          />
        </DialogContent>

        {!successAlert && (
          <DialogActions sx={{ px: 2 }}>
            <Button variant='outlined' size='small' onClick={handleClose}>
              Avbryt
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
              <span>Skicka</span>
            </LoadingButton>
          </DialogActions>
        )}

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

          {successAlert && (
            <Alert
              sx={{
                border: '1px solid #65c364',
                color: '#65c364',
                bgcolor: mode === 'light' ? '#fff' : '',
              }}
              severity='success'
            >
              Tack för ditt meddelande!
            </Alert>
          )}
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}
