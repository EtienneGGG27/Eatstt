// src/components/QRCodePage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

const QRCodePage = () => {
    const location = useLocation();
    const { amount, description, orderId } = location.state || {};

    if (!amount || !description || !orderId) {
        return <div>Erreur : Informations de la commande manquantes.</div>;
    }

    const qrValue = JSON.stringify({ amount, description, orderId });

    return (
        <div className="qrcode-container">
            <h2>Commande QR Code</h2>
            <div>
                <QRCode value={qrValue} />
            </div>
            <div>
                <p>Montant : {amount}€</p>
                <p>Description : {description}</p>
                <p>ID de la commande : {orderId}</p>
            </div>
        </div>
    );
};

export default QRCodePage;
