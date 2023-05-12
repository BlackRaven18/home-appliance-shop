import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Productlist from './Productlist';

function Products() {
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const subcategory = searchParams.get('subcategory');

    const categories = useSelector((state: RootState) => state.categories)

    return (
        <div>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                {categories.name}
            </Typography>
            <ProductContent categoryId={categories.categoryId} />
        </div>
    );
}

interface ProductContentProps {
    categoryId: string;
}

function ProductContent({ categoryId }: ProductContentProps) {
    return (
        <Productlist key={categoryId} categoryId={categoryId} />
    );
}

export default Products;
