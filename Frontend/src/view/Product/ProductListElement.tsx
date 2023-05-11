
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/ShoppingCartReducer';

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

const ProductListElement = (product: Product) => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const addProductToShoppingCart = (product: Product) => {
        dispatch(addProductToCart(product));
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
                    <Typography>Nazwa: {product.name ?? 'unknown'}</Typography>
                    <Typography>Marka: {product.brand ?? 'unknown'}</Typography>
                    <Typography>Kolor: {product.color ?? 'unknown'}</Typography>
                    <Typography>Specyfikacja: {product.specification ?? 'unknown'}</Typography>
                    <Typography>Cena: {product.price ?? 'unknown'}</Typography>

                    <Button variant="contained" color="primary" onClick={() => {
                        addProductToShoppingCart(product);
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
                <Grid item xs={4} >
                    <Box
                        component="img"
                        src={product.imageURL}
                        sx={{
                            height: 173.5,
                            width: 250,
                            maxWidth: { xs: 350, md: 250 },
                        }}
                    ></Box>
                </Grid>
            </Grid>
        </Box >
    )
}

export default ProductListElement;