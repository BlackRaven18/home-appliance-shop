import { Button, TextField, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from "react";
import ProductInterface from "../shared/ProductInterface";
import { SelectChangeEvent } from "@mui/material";
import UserDataManager from "../../UserDataManager/UserDataManager";
import LoadingSpinner from "../LoadingSpinner";

type Category = {
    categoryId: string;
    name: string;
};

const ManageProducts = () => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [searchText, setSearchText] = useState("");
    const [productId, setProductId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isModifyClicked, setIsModifyClicked] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBrand, setNewBrand] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newSpecification, setNewSpecification] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newImageURL, setNewImageURL] = useState("url");

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const getProducts = () => {
        setIsLoading(true);
        axios
            .get(process.env.REACT_APP_BACKEND_URL + `/products`,{
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            })
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getCategories = () => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + `/categories`,{
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            }) // Endpoint do pobierania kategorii
            .then((response) => {
                setCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const filteredProducts = products.filter((product) => {
        const productString = `${product.name} ${product.brand} ${product.color} ${product.specification} ${product.category.name}`.toLowerCase();
        return productString.includes(searchText.toLowerCase());
    });

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const createProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            name: { value: string };
            brand: { value: string };
            color: { value: string };
            specification: { value: string };
            price: {value: string};
            imageURL: {value: string};
        };
        const name = target.name.value;
        const brand = target.brand.value;
        const color = target.color.value;
        const specification = target.specification.value;
        const price = parseFloat(event.currentTarget.price.value);
        const imageURL = target.name.value;


        const newProduct = {
            name,
            brand,
            color,
            specification,
            price,
            imageURL,
            category: {
                categoryId: selectedCategory,
                name: "", // Możesz zostawić puste pole name, jeśli nie jest dostępne w tym miejscu
            },
        };

        axios
            .post(process.env.REACT_APP_BACKEND_URL + '/products', newProduct,{
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            })
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
            await axios.delete(process.env.REACT_APP_BACKEND_URL + '/products/' + productId,{
                auth: {
                    username: UserDataManager.getUsername(),
                    password: UserDataManager.getPassword()
                }
            });
            getProducts(); // reload the user list after deleting the user
        } catch (error) {
            console.error(error);
        }
    }


    const handleModifyClick = (productId: string) => {
        const product = products.find((p) => p.productId === productId);
        if (product) {
            setIsModifyClicked(true);
            setProductId(productId);
            setNewName(product.name);
            setNewBrand(product.brand);
            setNewColor(product.color);
            setNewSpecification(product.specification);
            setNewPrice(product.price.toString());
            setNewCategoryName(product.category?.name || "");
            setNewImageURL(product.imageURL);
        }
    };

    const handleModifySubmit = async () => {
        try {
            await axios.put(
                process.env.REACT_APP_BACKEND_URL + '/products/' + productId,
                {
                    productId: productId,
                    name: newName,
                    brand: newBrand,
                    color: newColor,
                    specification: newSpecification,
                    price: newPrice,
                    category: {
                        name: newCategoryName,
                    },
                    imageURL: newImageURL,
                },
                {
                    auth: {
                        username: UserDataManager.getUsername(),
                        password: UserDataManager.getPassword(),
                    },
                }
            );
            getProducts(); // załaduj ponownie listę produktów po modyfikacji
            setIsModifyClicked(false); // Zresetuj stan po zatwierdzeniu modyfikacji
        } catch (error) {
            console.log(error);
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

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setNewCategory(event.target.value);
    };

    const handleImageURLChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewImageURL(event.target.value as string);
    };

    return (
        <>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                <Box flex="1">
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>

                            <TextField
                                label="Wyszukaj produkt"
                                variant="outlined"
                                value={searchText}
                                onChange={handleSearchTextChange}
                                style={{ margin: '20px' }}
                            />
                {isLoading? (
                    <LoadingSpinner label="Trwa ładowanie produktów..."/>
                ) : <></>}
                {filteredProducts.map((product, index) => (
                        <div key={product.productId} style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '10px',
                            margin: '20px'
                        }}>
                        <p style={{ fontSize: '20px' }}><strong>Nazwa:</strong> {product.name}</p>
                        <p style={{ fontSize: '20px' }}><strong>Marka:</strong> {product.brand}</p>
                        <p style={{ fontSize: '20px' }}><strong>Kolor:</strong> {product.color}</p>
                        <p style={{ fontSize: '20px' }}><strong>Specyfikacja:</strong> {product.specification}</p>
                        <p style={{ fontSize: '20px' }}><strong>Cena:</strong> {product.price}</p>
                        <p style={{ fontSize: '20px' }}><strong>Kategoria:</strong> {product && product.category && product.category.name ? product.category.name : 'unknown'}</p>
                        <p style={{ fontSize: '20px' }}><strong>Obrazek:</strong> {product.imageURL}</p>
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
                                        style={{ margin: '5px' }}
                                    />
                                    <TextField
                                        label="Nowa marka"
                                        variant="outlined"
                                        value={newBrand}
                                        onChange={handleBrandChange}
                                        style={{ margin: '5px' }}
                                    />
                                    <TextField
                                        label="Nowy kolor"
                                        variant="outlined"
                                        value={newColor}
                                        onChange={handleColorChange}
                                        style={{ margin: '5px' }}
                                    />
                                    <TextField
                                        label="Nowa specyfikacja"
                                        variant="outlined"
                                        value={newSpecification}
                                        onChange={handleSpecificationChange}
                                        style={{ margin: '5px' }}
                                    />
                                    <TextField
                                        label="Nowa cena"
                                        variant="outlined"
                                        value={newPrice}
                                        onChange={handlePriceChange}
                                        style={{ margin: '5px' }}
                                    />
                                    <TextField
                                        label="Nowa kategoria"
                                        variant="outlined"
                                        value={newCategoryName}
                                        onChange={handleCategoryNameChange}
                                        style={{ margin: '5px' }}
                                    />
                                    <TextField
                                        label="Nowy obrazek"
                                        variant="outlined"
                                        value={newImageURL}
                                        onChange={handleImageURLChange}
                                        style={{ margin: '5px' }}
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
            </Box>
                <Box flex="1">
                    <Box
                        component="form"
                        noValidate
                        onSubmit={createProduct}
                        sx={{
                            ml: 1,
                            width: '400px',
                        }}
                        style={{ margin: '5px' }}
                    >
                        {/* Pozycja dla wyboru kategorii */}
                        <Select
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value as string)}
                            fullWidth
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>

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
                    name="imageURL"
                    label="Obrazek link"
                    id="imageURL"
                    autoComplete="imageURL"
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
              </Box>
            </Box>
        </>
    );
};

export default ManageProducts;