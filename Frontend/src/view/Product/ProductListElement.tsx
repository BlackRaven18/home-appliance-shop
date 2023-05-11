
import { Box, Grid, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
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

    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch();

    const addProductToShoppingCart = (product: Product) => {
        dispatch(addProductToCart(product));
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
                    <Typography>Nazwa: {product.name ?? 'unknown'}</Typography>
                    <Typography>Marka: {product.brand ?? 'unknown'}</Typography>
                    <Typography>Kolor: {product.color ?? 'unknown'}</Typography>
                    <Typography>Specyfikacja: {product.specification ?? 'unknown'}</Typography>
                    <Typography>Cena: {product.price ?? 'unknown'}</Typography>

                    <Button variant="contained" color="primary" onClick={() => addProductToShoppingCart(product)}>
                        Dodaj do koszyka
                    </Button>

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
        </Box>
    );
}

export default ProductListElement;