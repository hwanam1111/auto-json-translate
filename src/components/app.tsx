import React from 'react';
import DefaultRouter from '../routers/default-router';
import ResetStyles from '../styles/reset-styles';
import GlobalStyles from '../styles/global-styles';
import { ThemeProvider } from '../styles/theme-component';
import theme from '../styles/theme-styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DefaultRouter />
      <ResetStyles />
    </ThemeProvider>
  );
}

export default App;
