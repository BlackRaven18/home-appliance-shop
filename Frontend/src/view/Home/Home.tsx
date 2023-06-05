import NotLoggedInTopBar from '../../TopBar/NotLoggedInTopBar';
import Product from '../Product/Products';
import CategoryList from "./CategoryList";
import {Box} from "@mui/system";

function Home() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <NotLoggedInTopBar />
        <Box sx={{ flex: 1, display: 'flex', overflow: 'auto' }}>
            <CategoryList />
            <div style={{ flexGrow: 1, marginTop: '5px' }}>
                <Product />
            </div>
        </Box>
    </Box>
  );
}

export default Home;


