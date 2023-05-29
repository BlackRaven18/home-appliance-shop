import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from "react-router";
import ProductInterface from "../ProductInterface";

interface SummaryProductElementProps {
    quantity: number;
    productDetails: ProductInterface;
}

const SummaryProductElement: React.FC<SummaryProductElementProps> = ({ quantity, productDetails }) => {

    const navigate = useNavigate();

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
    );
}

export default SummaryProductElement