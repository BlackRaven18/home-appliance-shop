import { Box, Divider, Grid, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router';
import TopBar from '../../TopBar/TopBar';
import { StyleSheet } from 'react-native';
import { useState, MouseEvent } from "react";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/ShoppingCartReducer';
import PriceFormatter from '../../PriceFormattingUtils/PriceFormatter';


interface Product {
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

const ProductDetails = () => {

    const location = useLocation();
    const { state } = location;

    const [productDetails, setProductDetails] = useState<Product>(state);

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const addProductToShoppingCart = (product: Product)=> {
        dispatch(addProductToCart(product));
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <TopBar />

            <Typography
                variant="h4"
                align='center'
                margin="5px"
            >
                Szczegóły produktu
            </Typography>

            <Divider />

            <Box
                sx={{
                    marginTop: "50px",
                }}
            >
                <Grid container spacing='2'>
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            src={state.imageURL}
                            sx={{
                                height: 400,
                                width: '100%',
                                maxWidth: '100%',
                                '@media (min-width: 600px)': {
                                    maxWidth: '600px',
                                },
                                '@media (min-width: 800px)': {
                                    maxWidth: '800px',
                                },
                            }}
                        ></Box>

                    </Grid>
                    <Grid item xs={6}>

                        <Typography sx={styles.typographyStyle}>
                            <span style={styles.spanStyle}>Nazwa:</span>
                            {productDetails.name ?? 'unknown'}
                        </Typography>
                        <Typography sx={styles.typographyStyle}>
                            <span style={styles.spanStyle}>Marka:</span>
                            {productDetails.brand ?? 'unknown'}
                        </Typography>
                        <Typography sx={styles.typographyStyle}>
                            <span style={styles.spanStyle}>Kolor:</span>
                            {productDetails.color ?? 'unknown'}
                        </Typography>
                        <Typography sx={styles.typographyStyle}>
                            <span style={styles.spanStyle}>Specyfikacja:</span>
                            {productDetails.specification ?? 'unknown'}
                        </Typography>
                        <Typography sx={styles.typographyStyle}>
                            <span style={styles.spanStyle}>Cena:</span>
                            {PriceFormatter.getFormattedPrice(productDetails.price) ?? 'unknown'}
                        </Typography>

                        <Button variant="contained" color="primary" onClick={() => {
                            addProductToShoppingCart(productDetails);
                            setOpen(true);
                        }}>
                            Dodaj do koszyka
                        </Button>

                        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                            <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Produkt został dodany do koszyka!
                            </Alert>
                        </Snackbar>

                    </Grid>
                </Grid>
            </Box>


        </>
    )
}

const styles = StyleSheet.create({
    typographyStyle: {
        fontSize: 22,
    },

    spanStyle: {
        fontWeight: 'bold',
        paddingRight: 20,
    }
})

export default ProductDetails