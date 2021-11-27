import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import './App.css';
import store from './store';
import theme from './utils/theme';
import Login from './views/login';
// Import views

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<> view here </>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
