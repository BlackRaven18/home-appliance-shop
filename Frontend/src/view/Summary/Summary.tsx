
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Stripe from "react-stripe-checkout";
import { clearShoppingCart } from '../../redux/ShoppingCartReducer';
import { RootState } from "../../redux/store";
import SummaryTopBar from "../../topbar/SummaryTopBar";
import SummaryProductElement from './SummaryProductElement';
import PriceFormatter from "../../PriceFormattingUtils/PriceFormatter";

interface TokenI {
    id: string;
}

interface PaymentStatusDTO{
    status: string,
    message: string,
}


function Summary() {

    const secretKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "";
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState<String>('odbior-osobisty');
    const buyerId = "64679522e57752643a41b1dc";

    const handleSelectShippingMethod = (deliveryMethod: String) => {
        setDeliveryMethod(deliveryMethod)
    }

    const handleSuccessfulTransaction = () => {
        dispatch(clearShoppingCart());
        navigate("/shoppingcart");
        alert("Payment Success");
    }

    const handleFailedTransaction = (status: PaymentStatusDTO) => {
        alert("Payment failed!. " + status.message);
    }

    async function handleToken(token: TokenI) {

        const productDetailsDTO = shoppingCart.cart.map((item) => ({
            productId: item.productDetails.productId,
            quantity: item.quantity,
            price: item.productDetails.price,
        }))

        await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/payment/charge",
            {
                buyerId,
                deliveryMethod,
                productDetailsDTO,

            }, {
            headers: {
                token: token.id,
            },

        }).then((response) => {
            console.log(response);

            if(response.data.status === 'failed'){
                handleFailedTransaction(response.data)
            }else{
                handleSuccessfulTransaction();
            }

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
                    Całkowity koszt: {
                        PriceFormatter.getFormattedPrice(shoppingCart.totalAmount)
                    }
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
                        value={deliveryMethod}
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
                            amount={shoppingCart.totalAmount * 100}
                            currency="PLN"
                            panelLabel="Zapłać"
                            image={require('../logo.jpg')}
                            
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