import { Box, Typography } from '@mui/material'
import { useLocation } from 'react-router';
import Topbar from '../../topbar/Topbar';

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

    return (
        <>
            <Topbar/>
            
            <Box>
                <Typography>Nazwa: {state.name ?? 'unknown'}</Typography>
                <Typography>Marka: {state.brand ?? 'unknown'}</Typography>
                <Typography>Kolor: {state.color ?? 'unknown'}</Typography>
                <Typography>Specyfikacja: {state.specification ?? 'unknown'}</Typography>
                <Typography>Cena: {state.price ?? 'unknown'}</Typography>
            </Box>
        </>
    )
}

export default ProductDetails