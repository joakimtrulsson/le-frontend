import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import getLightDarkTheme from './getLightDarkTheme';
import { CartProvider } from './context/CartContext';

import {
  NavBar,
  Hero,
  Products,
  Footer,
  Projects,
  Services,
  Reviews,
  OurPartners,
  ShoppingCart,
  Error,
  OrderConfirmation,
  Map,
} from './components';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const LightDarkTheme = createTheme(getLightDarkTheme(mode));

  const toggleLightDarkMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const client = new ApolloClient({
    uri: import.meta.env.VITE_API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={LightDarkTheme}>
        <CartProvider>
          <CssBaseline />
          <NavBar mode={mode} toggleLightDarkMode={toggleLightDarkMode} />
          <Router>
            <Routes>
              <Route path='/status' element={<OrderConfirmation />} />
              <Route path='/error' element={<Error />} />
              <Route path='/' element={<Navigate to='/' />} />
            </Routes>
          </Router>
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
            <Map />
            <Divider />
            <Footer mode={mode} />
          </Box>
          <ShoppingCart mode={mode} />
        </CartProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
