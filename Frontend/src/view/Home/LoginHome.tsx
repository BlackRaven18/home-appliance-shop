import { Grid } from '@mui/material';
import TopBar from '../../TopBar/TopBar';
import Products from '../Product/Products';
import CategoryList from "./CategoryList";

function LoginHome() {

  return (
    <div>
      <TopBar />
      <Grid container spacing={2} sx={{ height: '100vh' }}>
        <CategoryList />
        <Grid item xs={12} md={10} sx={{ marginTop: '5px' }}>
          <Products />
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginHome;
