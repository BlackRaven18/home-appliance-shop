
import { Typography, Button, Grid, Box } from "@mui/material";
import axios from 'axios';

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


    return (
        <li key={product.productId}>
            <Typography>Nazwa: {product.name ?? 'unknown'}</Typography>
            <Typography>Marka: {product.brand ?? 'unknown'}</Typography>
            <Typography>Kolor: {product.color ?? 'unknown'}</Typography>
            <Typography>Specyfikacja: {product.specification ?? 'unknown'}</Typography>
            <Typography>Cena: {product.price ?? 'unknown'}</Typography>
            

        
            <Grid item xs={12}>
                <Box sx={{ borderBottom: '1px solid grey', marginTop: 2 }} />
            </Grid>
        </li>
    );
}

export default ProductListElement;