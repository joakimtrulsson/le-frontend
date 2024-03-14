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
import ReCAPTCHA from 'react-google-recaptcha';
import { ThemeModeProps, FormValues } from '../types/';
import { Box } from '@mui/material';

export default function FormDialog({ mode }: ThemeModeProps) {
  const recaptcha = React.useRef<ReCAPTCHA>(null);
  const [open, setOpen] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = React.useState('');
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

  const verifyCaptcha = async (captchaValue: string) => {
    const res = await fetch(import.meta.env.VITE_API_VERIFY_TOKEN, {
      method: 'POST',
      body: JSON.stringify({ captchaValue }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('verifycaptcha data', data);
    return data.success;
  };

  const sendEmail = async (formJson: FormValues) => {
    const response = await fetch(import.meta.env.VITE_API_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJson),
    });

    const data = await response.json();
    console.log('sendEmail data', data);
    return data.success;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson: FormValues = {
      name: formData.get('name') as string,
      contactEmail: formData.get('contactEmail') as string,
      phoneNr: Number(formData.get('phoneNr')),
      message: formData.get('message') as string,
    };
    const captchaValue = recaptcha.current?.getValue();

    setLoading(true);

    if (!captchaValue) {
      setErrorAlertMessage('Vänligen verifera att du är en människa!');
      setErrorAlert(true);
      setLoading(false);
    } else {
      const isCaptchaValid = await verifyCaptcha(captchaValue);

      if (isCaptchaValid) {
        try {
          const isEmailSent = await sendEmail(formJson);

          if (!isEmailSent) {
            setErrorAlertMessage('Något gick fel! Försök igen!');
            setErrorAlert(true);
            return;
          }

          setSuccessAlert(true);
        } catch (error) {
          console.error(error);
          setErrorAlert(true);
        } finally {
          setErrorAlert(false);
          setLoading(false);
        }
      } else {
        setErrorAlertMessage('Vänligen verifera att du är en människa!');
        setErrorAlert(true);
      }
    }
  };

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Kontakta oss
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
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

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_APP_SITE_KEY} />
          </Box>
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
              {errorAlertMessage}
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
    </>
  );
}
