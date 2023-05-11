import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductListElement from './ProductListElement';

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

let url = 'http://localhost:8080';

interface ProductContentProps {
    category: string;
}

interface ProductListProps {
    category: string;
}

const ProductList = ({ category }: ProductListProps) => {
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
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filteredProducts = products.filter((product) => {
        const productString = `${product.name} ${product.brand} ${product.color} ${product.specification}`.toLowerCase();
        return product.category.categoryId === category && productString.includes(searchText.toLowerCase());
    });
    return (
        <>
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
                    <ProductListElement {...product} />
                ))


            ) : (
                <p></p>
            )}
        </>
    );
}
export default ProductList;