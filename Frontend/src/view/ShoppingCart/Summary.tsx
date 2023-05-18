import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import { Box } from "@mui/material";

interface TokenI{
    id: string;
}

function Summary() {
    
    const secretKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "";
    console.log(secretKey);

    async function handleToken(token:TokenI) {
        console.log(token);
        await axios.post("http://localhost:8080/api/payment/charge", "", {
            headers: {
                token: token.id,
                amount: 500,
            },
        }).then((response) => {
            console.log(response);
            alert("Payment Success");
        }).catch((error) => {
            alert(error);
        });
    }
    return (
        <Box>
            <Stripe
                stripeKey={secretKey}
                token={handleToken}
            />
        </Box>
    );
}
export default Summary;