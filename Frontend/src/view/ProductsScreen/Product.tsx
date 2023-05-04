import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';



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


    return (
        <div>
            <Typography 
            variant="h4" 
            align="center" 
            sx={{ mt: 2 }}>
                {text}
            </Typography>
            
            <ProductList categoryName={category} />
        </div>
    );
}




export default Products;
