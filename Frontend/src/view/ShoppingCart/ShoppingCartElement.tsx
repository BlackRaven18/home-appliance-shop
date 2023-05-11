import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material'
import { useDispatch } from 'react-redux';
import { decrementAmountOfProduct, incrementAmountOfProduct } from '../../redux/ShoppingCartReducer';

type Product = {
    productId: string;
    name: string;
    brand: string;
    color: string;
    specification: string;
    price: number;
    imageURL: string;
    category: {
        categoryId: string;
        name: string;
    };
}

type CartElement = {
    quantity: number,
    productDetails: Product,
};

interface ShoppingCartElementProps {
    quantity: number;
    productDetails: Product;
}

const ShoppingCartElement: React.FC<ShoppingCartElementProps> = ({ quantity, productDetails }) => {

    const dispatch = useDispatch();

    const incrementAmount = (productDetails: Product) => {
        dispatch(incrementAmountOfProduct(productDetails))
    }

    const decrementAmount = (productDetails: Product) => {
        dispatch(decrementAmountOfProduct(productDetails))
    }

    return (
        <Box sx={{
            border: '1px solid grey',
            padding: '15px',
            margin: '5px',
            borderRadius: '8px',
            width: '90%'
        }}>
            <Grid container spacing='2'>
                <Grid item xs={8}>
                    <Typography>Nazwa: {productDetails.name ?? 'unknown'}</Typography>
                    <Typography>Marka: {productDetails.brand ?? 'unknown'}</Typography>
                    <Typography>Kolor: {productDetails.color ?? 'unknown'}</Typography>
                    <Typography>Specyfikacja: {productDetails.specification ?? 'unknown'}</Typography>
                    <Typography>Cena: {productDetails.price ?? 'unknown'}</Typography>
                    <Typography>Ilosc: {quantity}</Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => incrementAmount(productDetails)}>+</Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => decrementAmount(productDetails)}>-</Button>
                </Grid>
                <Grid item xs={4} >
                    <Box
                        component="img"
                        src={productDetails.imageURL}
                        sx={{
                            height: 173.5,
                            width: 250,
                            maxWidth: { xs: 350, md: 250 },
                        }}
                    ></Box>
                </Grid>
            </Grid>
        </Box>
    )

}

export default ShoppingCartElement