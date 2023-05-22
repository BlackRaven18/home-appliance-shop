import { Grid } from '@mui/material';
import NotLoggedInTopBar from '../../TopBar/NotLoggedInTopBar.tsx';
import Product from '../Product/Products';
import CategoryList from "./CategoryList";



function Loginhome() {

  return (
    <div>
      <NotLoggedInTopBar />
      <Grid container spacing={2} sx={{ height: '100vh' }}>
        <CategoryList />
        <Grid item xs={12} md={10} sx={{ marginTop: '5px' }}>
          <Product />
        </Grid>
      </Grid>
    </div>
  );
}

export default Loginhome;


