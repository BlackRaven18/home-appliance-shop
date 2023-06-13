import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductListElement from './ProductListElement';
import  ProductInterface  from '../shared/ProductInterface'



interface ProductListProps {
    categoryId: string;
}

const ProductList = ({ categoryId }: ProductListProps) => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/products")
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filteredProducts = products.filter((product) => {
        const productString = `${product.name} ${product.brand} ${product.color} ${product.specification}`.toLowerCase();
        return product.category.categoryId === categoryId && productString.includes(searchText.toLowerCase());
    });
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
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
                    <ProductListElement key={product.productId} {...product} />
                ))


            ) : (
                <p></p>
            )}
        </Box>
    );
}
export default ProductList;