import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Productlist from './Productlist';

let url = 'http://localhost:8080';
let category = '';
function Products() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subcategory = searchParams.get('subcategory');
    let text = '';

    if (subcategory === 'Laptopy') {
        text = 'Laptopy';
        category = '6440372026ff7077c98759e9';
    } else if (subcategory === 'Komputery') {
        text = 'Komputery';
        category = '6440370a26ff7077c98759e7';
    }

    const productContent = <ProductContent category={category} />;

    return (
        <div>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                {text}
            </Typography>
            {productContent}
        </div>
    );
}

interface ProductContentProps {
    category: string;
}

function ProductContent({ category }: ProductContentProps) {
    return (
         <Productlist category={category} />
    );
}

export default Products;
