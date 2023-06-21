import { Box } from '@mui/system';
import TopBar from '../../TopBar/TopBar';
import Products from '../Product/Products';
import CategoryList from "./CategoryList";

function LoginHome() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar data-testid="top-bar" />
            <Box sx={{ flex: 1, display: 'flex', overflow: 'auto' }}>
                <CategoryList data-testid="category-list"/>
                <div style={{ flexGrow: 1, marginTop: '5px' }}>
                    <Products data-testid="products"/>
                </div>
            </Box>
        </Box>
    );
}

export default LoginHome;
