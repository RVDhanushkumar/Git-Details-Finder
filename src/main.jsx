import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DataPage from './components/DataPage'; // 👈 create this component
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/data" element={<DataPage />} />
    </Routes>
  </BrowserRouter>
);
