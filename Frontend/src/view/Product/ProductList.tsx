import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductListElement from './ProductListElement';
import ProductInterface from '../shared/ProductInterface'
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import LoadingSpinner from '../LoadingSpinner';
import { ArrowUpward, ArrowDownward, Settings } from '@mui/icons-material';



interface ProductListProps {
    categoryId: string;
}

enum SortOption {
    Default = 'default',
    LowestPrice = 'lowest',
    HighestPrice = 'highest',
    NameAscending = 'nameAscending',
    NameDescending = 'nameDescending',
}


const ProductList = ({ categoryId }: ProductListProps) => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SortOption>(SortOption.Default);

    const handleOptionChange = (option: SortOption) => {
        console.log("tutaj" + selectedOption);
        switch (option) {
            case SortOption.LowestPrice:
                sortAscending();
                break;
            case SortOption.HighestPrice:
                sortDescending();
                break;
            case SortOption.NameAscending:
                sortByNameAscending();
                break;
            case SortOption.NameDescending:
                sortByNameDescending();
                break;
            default:
                getProducts();
                break;
        }
    };

    const sortAscending = () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
    };

    const sortDescending = () => {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
    };

    const sortByNameAscending = () => {
        const sortedProducts = [...products].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setProducts(sortedProducts);
      };
    
      const sortByNameDescending = () => {
        const sortedProducts = [...products].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setProducts(sortedProducts);
      };

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        if (categoryId.length <= 0) {
            return;
        }

        setIsLoading(true);

        axios
            .get(process.env.REACT_APP_BACKEND_URL + "/products/categories/" + categoryId)
            .then(function (response) {
                setProducts(response.data);
                setIsLoading(false);
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

            {isLoading ? (
                <LoadingSpinner label='Trwa ładowanie produktów...' />
            ) : <p></p>}

            {products.length > 0 ? (
                <Box>
                    <FormControl variant="outlined">
                        <InputLabel id="sort-label">Sortuj według:</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort-dropdown"
                            value={selectedOption}
                            label="Sortuj według:"
                        >
                            <MenuItem
                                value={SortOption.Default}
                                onClick={() => {
                                    setSelectedOption(SortOption.Default)
                                    handleOptionChange(SortOption.Default);
                                }}
                            >
                                <Settings /> Domyślnie
                            </MenuItem>

                            <MenuItem
                                value={SortOption.LowestPrice}
                                onClick={() => {
                                    setSelectedOption(SortOption.LowestPrice)
                                    handleOptionChange(SortOption.LowestPrice);
                                }}
                            >
                                <ArrowDownward /> Cena od najmniejszej
                            </MenuItem>

                            <MenuItem
                                value={SortOption.HighestPrice}
                                onClick={() => {
                                    setSelectedOption(SortOption.HighestPrice)
                                    handleOptionChange(SortOption.HighestPrice);
                                }}
                            >
                                <ArrowUpward /> Cena od największej
                            </MenuItem>

                            <MenuItem
                                value={SortOption.NameAscending}
                                onClick={() => {
                                    setSelectedOption(SortOption.NameAscending)
                                    handleOptionChange(SortOption.NameAscending);
                                }}
                            >
                                <ArrowDownward /> Po nazwie A-Z
                            </MenuItem>
                            <MenuItem
                                value={SortOption.NameDescending}
                                onClick={() => {
                                    setSelectedOption(SortOption.NameDescending)
                                    handleOptionChange(SortOption.NameDescending);
                                }}
                            >
                                <ArrowUpward /> Po nazwie Z-A
                            </MenuItem>

                        </Select>
                    </FormControl>
                    <Divider sx={{margin: 2}}/>
                </Box>
            ) : (<></>)}


            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductListElement key={product.productId} {...product} />
                ))

            ) : (<p></p>)
            }

        </Box>
    );
}
export default ProductList;