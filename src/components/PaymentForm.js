// src/components/PaymentForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const amount = 5; // Prix à payer
    const description = 'Description du menu acheter';

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length <= 16) {
            const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            setCardNumber(formattedValue);
        }
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length <= 4) {
            const formattedValue = value.replace(/(\d{2})(?=\d)/g, '$1/');
            setExpiryDate(formattedValue);
        }
    };

    const handleCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length <= 3) {
            setCvc(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        const cardNumberDigits = cardNumber.replace(/\s/g, '');
        const cardNumberRegex = /^[0-9]{16}$/;
        if (!cardNumberRegex.test(cardNumberDigits)) {
            newErrors.cardNumber = 'Veuillez entrer un numéro de carte valide.';
        }

        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!expiryDateRegex.test(expiryDate)) {
            newErrors.expiryDate = 'Veuillez entrer une date d\'expiration valide (MM/AA).';
        }

        const cvcRegex = /^[0-9]{3}$/;
        if (!cvcRegex.test(cvc)) {
            newErrors.cvc = 'Veuillez entrer un CVC valide à 3 chiffres.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const orderId = generateRandomId();
        const orderData = {
            amount,
            description,
            orderId
        };

        navigate('/qrcode', { state: orderData });
    };

    return (
        <div className="payment-container">
            <div className="payment-details">
                <div className="amount">
                    <span>Montant à payer : </span>
                    <strong>{amount}€</strong>
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>
            <form className="payment-form" onSubmit={handleSubmit}>
                <h2>Détails de paiement</h2>
                <div className="form-group">
                    <label htmlFor="cardNumber">Numéro de carte</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        required
                    />
                    {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Date d'expiration</label>
                    <input
                        type="text"
                        id="expiryDate"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        required
                    />
                    {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="cvc">CVC</label>
                    <input
                        type="text"
                        id="cvc"
                        value={cvc}
                        onChange={handleCvcChange}
                        required
                    />
                    {errors.cvc && <span className="error">{errors.cvc}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nom sur la carte</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Payer</button>
            </form>
        </div>
    );
};

export default PaymentForm;
