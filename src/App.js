// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';
import QRCodePage from './components/QRCodePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PaymentForm />} />
                <Route path="/qrcode" element={<QRCodePage />} />
            </Routes>
        </Router>
    );
};

export default App;
