
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../redux/ShoppingCartReducer';
import { useNavigate } from "react-router";


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
    const navigate = useNavigate();
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

    const goToProductDetails = () => {
        navigate('/productdetails', {state: product});
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
                    <Typography><strong>Nazwa:</strong> {product.name ?? 'unknown'}</Typography>
                    <Typography><strong>Marka:</strong> {product.brand ?? 'unknown'}</Typography>
                    <Typography><strong>Kolor:</strong> {product.color ?? 'unknown'}</Typography>
                    <Typography><strong>Specyfikacja:</strong> {product.specification ?? 'unknown'}</Typography>
                    <Typography><strong>Cena:</strong> {product.price ?? 'unknown'}</Typography>

                    <Button variant="contained" color="primary" onClick={(event) => {
                        // zatrzymanie propagacji zdarzenia, czyli nastąpi tylko obsługa kliknięcia
                        // przycisku a nie najpierw obsługa zdarzenia kliknięcia w Box
                        event.stopPropagation();
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
                            width: '100%',
                            maxWidth: { xs: 350, md: 250 },
                        }}
                    />

                </Grid>
            </Grid>
        </Box >
    )
}

export default ProductListElement;