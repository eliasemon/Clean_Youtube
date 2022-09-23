import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StoreProvider } from 'easy-peasy';
import store  from './store';
import CssBaseline from '@mui/material/CssBaseline';
ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
     <CssBaseline />
    <App />
  </StoreProvider>
)
