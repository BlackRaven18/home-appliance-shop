
import Stripe from "react-stripe-checkout";
import axios from "axios";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router";
import { clearShoppingCart } from '../../redux/ShoppingCartReducer';
import { useDispatch } from 'react-redux';

interface TokenI{
    id: string;
}

function Summary() {
    
    const secretKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY ?? "";

    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSuccessfulTransaction = () => {
        dispatch(clearShoppingCart());
        navigate("/shoppingcart");
        alert("Payment Success");
    }

    async function handleToken(token:TokenI) {
        console.log(token);
        await axios.post("http://localhost:8080/api/payment/charge", "", {
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
        <Box>
            <Stripe
                stripeKey={secretKey}
                token={handleToken}
            />
        </Box>
    );
}
export default Summary;