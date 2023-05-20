
import {
    Box,
    Typography,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Stripe from "react-stripe-checkout";
import { clearShoppingCart } from '../../redux/ShoppingCartReducer';
import { RootState } from "../../redux/store";
import SummaryTopBar from "../../topbar/SummaryTopBar";
import SummaryProductElement from './SummaryProductElement';
import { useState } from "react";

interface TokenI {
    id: string;
}

function Summary() {

    const secretKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "";
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shippingMethod, setShippingMethod] = useState<String>('odbior-osobisty');

    const handleSelectShippingMethod = (shippingMethod: String) => {
        setShippingMethod(shippingMethod)
    }

    const handleSuccessfulTransaction = () => {
        dispatch(clearShoppingCart());
        navigate("/shoppingcart");
        alert("Payment Success");
    }

    async function handleToken(token: TokenI) {
        console.log(token);
        await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/payment/charge", "", {
            headers: {
                token: token.id,
                amount: 5,//shoppingCart.totalAmount,
            },
        }).then((response) => {
            console.log(response);
            handleSuccessfulTransaction();

        }).catch((error) => {
            alert(error);
        });
    }
    return (
        <>
            <SummaryTopBar />

            <Box>
                <Typography variant="h4" align="center">
                    Podsumowanie
                </Typography>

                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    padding='5px'
                >
                    {shoppingCart.cart.length > 0 ? (
                        shoppingCart.cart.map((cartElement) => (
                            <SummaryProductElement
                                key={cartElement.productDetails.productId}
                                quantity={cartElement.quantity}
                                productDetails={cartElement.productDetails} />
                        ))
                    ) : (
                        <Typography>Koszyk jest pusty</Typography>
                    )}
                </Box>

                <Typography variant='h5' padding='10px'>
                    Liczba produktów: {shoppingCart.productsNumber}
                </Typography>

                <Typography variant='h5' padding='10px'>
                    Całkowity koszt: {shoppingCart.totalAmount}
                </Typography>

                <Divider></Divider>

                <Typography variant="h4" align="center" padding='10px'>
                    Metody dostawy:
                </Typography>

                <FormControl>
                    <FormLabel> Metody dostawy</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={shippingMethod}
                        onChange={(event) => handleSelectShippingMethod(event.target.value)}
                    >
                        <FormControlLabel value="odbior-osobisty" control={<Radio />} label="Odbiór osobisty" />
                        <FormControlLabel value="kurier" control={<Radio />} label="Kurier" />
                    </RadioGroup>
                </FormControl>

                <Divider></Divider>




                <Typography variant='h4' padding='10px' align='center'>
                    Metody płatności:
                </Typography>

                {shoppingCart.totalAmount > 0 ? (
                    <Box
                        sx={{
                            border: '1px solid grey',
                            padding: '15px',
                            margin: 'auto',
                            borderRadius: '8px',
                            width: '90%',

                        }}
                    >

                        <Stripe
                            stripeKey={secretKey}
                            token={handleToken}
                            label={'Płatność kartą'}
                        />
                    </Box>
                ) : (
                    <p></p>
                )
                }


            </Box>
        </>
    );
}
export default Summary;