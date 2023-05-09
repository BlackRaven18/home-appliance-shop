import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Productlist from './Productlist';

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
                <Box sx={{ border: '1px solid grey', padding: '17px', borderRadius: '8px', width: '90%' }}>
                    <Grid container spacing = '2'>
                        <Grid item xs={9}>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {filteredProducts.map((product) => (
                                    <Productlist {...product} />
                                ))}
                            </ul>
                        </Grid>
                        <Grid item xs={1} sx={{ textAlign: 'center' }}>
                            {filteredProducts.map((product) => (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 173,
                                        width: 250,

                                        maxWidth: { xs: 350, md: 250 },
                                        padding: 0,
                                        border: '1px solid grey',
                                        borderRadius: 0,
                                        display: 'block',
                                        margin: 'auto',
                                        boxSizing: 'border-box',
                                        borderTop: '0',
                                        borderLeft: '0',
                                        borderRight: '0'
                                    }}
                                    src={product.imageURL}
                                />
                            ))}
                        </Grid>

                    </Grid>
                </Box>
            ) : (
                <p></p>
            )}

        </>
    );
}

export default Products;
