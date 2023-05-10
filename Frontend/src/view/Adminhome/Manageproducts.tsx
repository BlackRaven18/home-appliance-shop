import * as React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

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

const Manageproducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios
            .get(url + `/products`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
        <div>
            <TextField
                label="Wyszukaj produkt"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
                style={{ margin: '20px' }}
            />
            {filteredProducts.map((product) => (
                <div key={product.productId} style={{ border: '1px solid gray', borderRadius: '10px', padding: '10px', width: '500px' }}>
                    <p style={{ fontSize: '20px' }}>Nazwa: {product.name}</p>
                    <p style={{ fontSize: '20px' }}>Marka: {product.brand}</p>
                    <p style={{ fontSize: '20px' }}>Kolor: {product.color}</p>
                    <p style={{ fontSize: '20px' }}>Specyfikacja: {product.specification}</p>
                    <p style={{ fontSize: '20px' }}>Cena: {product.price}</p>
                    <p style={{ fontSize: '20px' }}>Kategoria: {product && product.category && product.category.name ? product.category.name : 'unknown'}</p>
                    <Button variant="contained">Usuń</Button>
                </div>

            ))}
        </div>
    <Box
        component="form"
        noValidate
        sx={{
            ml: 1,
            width: '400px' // Add this line to set the width of the Box
        }}
        style={{ margin: '80px' }}
    >
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nazwa"
            name="name"
            autoComplete="name"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="brand"
            label="Marka"
            type="brand"
            id="brand"
            autoComplete="brand"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="color"
            label="Kolor"
            id="color"
            autoComplete="color"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="specification"
            label="Specyfikacja"
            id="specification"
            autoComplete="specification"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Cena"
            id="price"
            autoComplete="price"
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="category"
            label="Kategoria"
            id="category"
            autoComplete="category"
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Dodaj produkt
        </Button>

    </Box>
            </>
    );
};

export default Manageproducts;
