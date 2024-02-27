import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import getLightDarkTheme from './getLightDarkTheme';

import NavBar from './components/NavBar';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const LightDarkTheme = createTheme(getLightDarkTheme(mode));

  const client = new ApolloClient({
    uri: import.meta.env.VITE_API_URL,
    cache: new InMemoryCache(),
  });

  const toggleLightDarkMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={LightDarkTheme}>
          <CssBaseline />
          <NavBar mode={mode} toggleLightDarkMode={toggleLightDarkMode} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
