import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from './CardForm';

const stripePromise = loadStripe('pk_test_51IiH58JhMkSXXJ6pJjjiQ639Kb0XkRHQrilRCpF6sRqAkpN2hLGXZY147qRGDel9VII7Lloo8LnXWzlQYJvMqKXM00S1mc69lw');

const Payment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <CardForm handlePayment={handlePayment} ></CardForm>
        </Elements>
    );
};

export default Payment;