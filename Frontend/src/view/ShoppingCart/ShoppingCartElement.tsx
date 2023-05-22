import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { decrementAmountOfProduct, incrementAmountOfProduct } from '../../redux/ShoppingCartReducer';
import { useNavigate } from "react-router";

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

interface ShoppingCartElementProps {
    quantity: number;
    productDetails: Product;
}

const ShoppingCartElement: React.FC<ShoppingCartElementProps> = ({ quantity, productDetails }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const incrementAmount = (productDetails: Product) => {
        dispatch(incrementAmountOfProduct(productDetails))
    }

    const decrementAmount = (productDetails: Product) => {
        dispatch(decrementAmountOfProduct(productDetails))
    }

    const goToProductDetails = () => {
        navigate('/productdetails', { state: productDetails });
    }


    return (

        <Box
            onClick={goToProductDetails}
            sx={{
                border: '1px solid grey',
                padding: '15px',
                margin: '5px',
                borderRadius: '8px',
                width: '90%',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'lightgrey',
                }
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
                        onClick={(event) => {
                            event.stopPropagation();
                            incrementAmount(productDetails)
                        }}
                        sx={{ marginRight: '10px' }}
                    >
                        +
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            event.stopPropagation();
                            decrementAmount(productDetails)
                        }}
                    >
                        -
                    </Button>

                </Grid>
                <Grid item xs={4} >
                    <Box
                        component="img"
                        src={productDetails.imageURL}
                        sx={{
                            height: 173.5,
                            width: '100%',
                            maxWidth: { xs: 350, md: 250 },
                        }}
                    ></Box>
                </Grid>
            </Grid>
        </Box>
    )

}

export default ShoppingCartElement