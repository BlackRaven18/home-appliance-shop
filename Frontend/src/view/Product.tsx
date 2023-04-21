import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import axios from 'axios';

interface Product {
    productId: string;
    name: string;
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

    const filteredProducts = products.filter(product => product.category.categoryId === category);

    return (
        <>
            {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.productId}>{`Name: ${product.name ?? 'unknown'}`}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading products...</p>
            )}
        </>
    );
}

export default Products;
