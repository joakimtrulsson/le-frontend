import React from 'react';

function Form() {
  return {
    /* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Typography
              component='h3'
              sx={{
                fontFamily: 'Times New Roman, serif',
                fontSize: '36px',
                fontWeight: 600,
                letterSpacing: 1.05,
                lineHeight: 78 / 70,
              }}
              gutterBottom
            >
              LE Entreprenad
            </Typography>
            <Typography variant='body2' fontWeight={600} gutterBottom>
              Kontakta oss
            </Typography>
            <Typography variant='body2' color='text.secondary' mb={2}>
              Använd forumäret för att kontakta oss. Vi återkommer så snart vi kan.
            </Typography>
            <Stack direction='column' spacing={1} useFlexGap>
              <TextField
                id='outlined-basic'
                hiddenLabel
                size='small'
                variant='outlined'
                fullWidth
                aria-label='Enter you name'
                placeholder='Ditt namn'
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your name',
                }}
              />
              <TextField
                id='outlined-basic'
                hiddenLabel
                size='small'
                variant='outlined'
                fullWidth
                aria-label='Enter you phone number'
                placeholder='Ditt telefonnummer'
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your phone number',
                }}
              />
              <TextField
                id='outlined-basic'
                hiddenLabel
                size='small'
                variant='outlined'
                fullWidth
                aria-label='Enter your email address'
                placeholder='Your email address'
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                }}
              />
              <TextField
                id='outlined-multiline-static'
                hiddenLabel
                multiline
                rows={4}
                aria-label='Enter your message'
                placeholder='Meddelande...'
              />

              <Button variant='contained' color='primary' sx={{ flexShrink: 0 }}>
                Skicka
              </Button>
            </Stack>
          </Box>
        </Box> */
  };
}

export default Form;
