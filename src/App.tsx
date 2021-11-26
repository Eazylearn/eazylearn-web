import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import store from './store';
// Import views

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<> view here </>} />

          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
