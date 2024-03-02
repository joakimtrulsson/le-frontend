import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import getLightDarkTheme from './getLightDarkTheme';

import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Products from './components/Products';
import Footer from './components/Footer';
import Projects from './components/Projects';
import Services from './components/Services';
import Reviews from './components/Reviews';
import OurPartners from './components/OurPartners';
import ShoppingCart from './components/ShoppingCart';

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
    <ApolloProvider client={client}>
      <ThemeProvider theme={LightDarkTheme}>
        <CssBaseline />
        <NavBar mode={mode} toggleLightDarkMode={toggleLightDarkMode} />
        <Hero mode={mode} />
        <Box sx={{ bgcolor: 'background.default' }}>
          <OurPartners mode={mode} />
          <Divider />
          <Products />
          <Divider />
          <Projects />
          <Divider />
          <Services />
          <Divider />
          <Reviews />
          <Divider />
          <Footer mode={mode} />
        </Box>
        <ShoppingCart />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
