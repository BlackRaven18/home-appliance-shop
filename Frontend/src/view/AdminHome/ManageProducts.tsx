import * as React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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

const ManageProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [productId, setProductId] = useState("");

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

    const createProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            brand: { value: string };
            color: { value: string };
            specification: { value: string };
        };
        const name = target.name.value;
        const brand = target.brand.value;
        const color = target.color.value;
        const specification = target.specification.value;
        const price = parseFloat(event.currentTarget.price.value);


        const newProduct = {
            name,
            brand,
            color,
            specification,
            price,

        };

        axios
            .post(url + '/products', newProduct)
            .then((response) => {
                setProducts([...products, response.data]);
                event.currentTarget.reset();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await axios.delete(url + '/products/' + productId);
            getProducts(); // reload the user list after deleting the user
        } catch (error) {
            console.error(error);
        }
    }

    const [isModifyClicked, setIsModifyClicked] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBrand, setNewBrand] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newSpecification, setNewSpecification] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");


    const handleModifyClick = (productId: string) => {
        setIsModifyClicked(true);
        setProductId(productId);
    };

    const handleModifySubmit = async () => {
        try {
            await axios.put(url + '/products/' + productId, {
                name: newName,
                brand: newBrand,
                color: newColor,
                specification: newSpecification,
                price: newPrice,
                category: {
                    name: newCategoryName,
                }
            });
            getProducts(); // załaduj ponownie listę użytkowników po modyfikacji
            setIsModifyClicked(false); // Zresetuj stan po zatwierdzeniu modyfikacji
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };
    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBrand(event.target.value);
    };
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewColor(event.target.value);
    };
    const handleSpecificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewSpecification(event.target.value);
    };
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrice(event.target.value);
    };
    const handleCategoryNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(event.target.value);
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
                {filteredProducts.map((product, index) => (
                    <div key={product.productId} style={{ border: '1px solid gray', borderRadius: '10px', padding: '10px', width: '500px' }}>
                        <p style={{ fontSize: '20px' }}>Nazwa: {product.name}</p>
                        <p style={{ fontSize: '20px' }}>Marka: {product.brand}</p>
                        <p style={{ fontSize: '20px' }}>Kolor: {product.color}</p>
                        <p style={{ fontSize: '20px' }}>Specyfikacja: {product.specification}</p>
                        <p style={{ fontSize: '20px' }}>Cena: {product.price}</p>
                        <p style={{ fontSize: '20px' }}>Kategoria: {product && product.category && product.category.name ? product.category.name : 'unknown'}</p>
                        <Button variant="contained" style={{ margin: '15px' }} onClick={() => handleDeleteProduct(product.productId)}>Usuń</Button>
                        <Button variant="contained" onClick={() => handleModifyClick(product.productId)}>Modyfikuj</Button>
                        {isModifyClicked && productId === product.productId && (
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Nowa nazwa"
                                        variant="outlined"
                                        value={newName}
                                        onChange={handleNameChange}
                                        style={{margin: '5px'}}
                                    />
                                    <TextField
                                        label="Nowa marka"
                                        variant="outlined"
                                        value={newBrand}
                                        onChange={handleBrandChange}
                                        style={{margin: '5px'}}
                                    />
                                    <TextField
                                        label="Nowy kolor"
                                        variant="outlined"
                                        value={newColor}
                                        onChange={handleColorChange}
                                        style={{margin: '5px'}}
                                    />
                                    <TextField
                                        label="Nowa specyfikacja"
                                        variant="outlined"
                                        value={newSpecification}
                                        onChange={handleSpecificationChange}
                                        style={{margin: '5px'}}
                                    />
                                    <TextField
                                        label="Nowa cena"
                                        variant="outlined"
                                        value={newPrice}
                                        onChange={handlePriceChange}
                                        style={{margin: '5px'}}
                                    />
                                    <TextField
                                        label="Nowa kategoria"
                                        variant="outlined"
                                        value={newCategoryName}
                                        onChange={handleCategoryNameChange}
                                        style={{margin: '5px'}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={handleModifySubmit}>
                                        Zatwierdź
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </div>
                ))}
            </div>
            <Box
                component="form"
                noValidate
                onSubmit={createProduct}
                sx={{
                    ml: 1,
                    width: '400px'
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

export default ManageProducts;
