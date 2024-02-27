import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLightDarkTheme from './getLightDarkTheme';

import NavBar from './components/NavBar';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const LightDarkTheme = createTheme(getLightDarkTheme(mode));

  const toggleLightDarkMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <ThemeProvider theme={LightDarkTheme}>
        <CssBaseline />
        <NavBar mode={mode} toggleLightDarkMode={toggleLightDarkMode} />
      </ThemeProvider>
    </>
  );
}

export default App;
