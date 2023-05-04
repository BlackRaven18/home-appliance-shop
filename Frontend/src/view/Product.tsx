import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import ProductListElement from './ProductListElement';


let url = 'http://localhost:8080';

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


function Products() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subcategory = searchParams.get('subcategory');

    let text = '';
    let category = '';

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
                    <ProductListElement {...product}/>
                ))

            ) : ( <p></p>)}
        </>
    );
}

export default Products;
