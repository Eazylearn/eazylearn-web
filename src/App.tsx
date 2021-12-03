import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import './App.css';
import store from './store';
import theme from './utils/theme';
// Import views
import HomeScreen from './screens/HomeScreen';
import Login from './screens/login';
import ForgotPassword from './screens/forgot-password';
import CourseConfig from './screens/course-config';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/course/:id" element={<CourseConfig />} />
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
