import { Box } from '@mui/system';
import TopBar from '../../TopBar/TopBar';
import Products from '../Product/Products';
import CategoryList from "./CategoryList";

function LoginHome() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <TopBar />
            <Box sx={{ flex: 1, display: 'flex', overflow: 'auto' }}>
                <CategoryList />
                <div style={{ flexGrow: 1, marginTop: '5px' }}>
                    <Products />
                </div>
            </Box>
        </Box>
    );
}

export default LoginHome;
