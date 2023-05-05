import { useState, useEffect} from 'react'
import { Box, TextField } from '@mui/material';
import  axios  from 'axios';
import {StyleSheet} from 'react-native'
import ProductListElement from './ProductListElement';
import Product from './ProductInterface';


interface Category {
    categoryName: string
}



let url = 'http://localhost:8080';

const ProductList = (category: Category) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios
            .get(`${url}/products`)
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filteredProducts = products.filter((product) => {
        const productString = `${product.name} ${product.brand} ${product.color} ${product.specification}`.toLowerCase();
        return product.category.categoryId === category.categoryName && productString.includes(searchText.toLowerCase());
    });

    return (
        <>
            <Box sx={styles.boxStyle}>
                <TextField
                    label="Szukaj"
                    variant="outlined"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    sx={{ mb: 2, width: '50%' }}
                />
            </Box>

            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductListElement {...product} key={product.productId}/>
                ))

            ) : ( <p></p>)}
        </>
    );
}

const styles = StyleSheet.create({
    boxStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
})

export default ProductList