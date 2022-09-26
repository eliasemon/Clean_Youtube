import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StoreProvider } from 'easy-peasy';
import store  from './store';
import CssBaseline from '@mui/material/CssBaseline';
import { MemoryRouter ,ScrollRestoration  } from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <CssBaseline />
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </StoreProvider>
)
