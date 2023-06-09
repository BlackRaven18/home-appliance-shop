import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { decrementAmountOfProduct, incrementAmountOfProduct } from '../../redux/ShoppingCartReducer';
import ProductInterface from "../shared/ProductInterface";
import PriceFormatter from '../../PriceFormattingUtils/PriceFormatter';

interface ShoppingCartElementProps {
    quantity: number;
    productDetails: ProductInterface;
}

const ShoppingCartElement: React.FC<ShoppingCartElementProps> = ({ quantity, productDetails }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const incrementAmount = (productDetails: ProductInterface) => {
        dispatch(incrementAmountOfProduct(productDetails))
    }

    const decrementAmount = (productDetails: ProductInterface) => {
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
                    <Typography><strong>Nazwa:</strong> {productDetails.name ?? 'unknown'}</Typography>
                    <Typography><strong>Marka:</strong> {productDetails.brand ?? 'unknown'}</Typography>
                    <Typography><strong>Kolor:</strong> {productDetails.color ?? 'unknown'}</Typography>
                    <Typography><strong>Specyfikacja:</strong> {productDetails.specification ?? 'unknown'}</Typography>
                    <Typography><strong>Cena:</strong> {PriceFormatter.getFormattedPrice(productDetails.price) ?? 'unknown'}</Typography>
                    <Typography><strong>Ilosc:</strong> {quantity}</Typography>

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