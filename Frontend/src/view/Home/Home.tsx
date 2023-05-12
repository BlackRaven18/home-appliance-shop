import { Grid } from '@mui/material';
import Notloggedintopbar from '../../topbar/Notloggedintopbar';
import Product from '../Product/Products';
import Categorylist from "./Categorylist";



function Loginhome() {

  return (
    <div>
      <Notloggedintopbar />
      <Grid container spacing={2} sx={{ height: '100vh' }}>
        <Categorylist />
        <Grid item xs={12} md={10} sx={{ marginTop: '5px' }}>
          <Product />
        </Grid>
      </Grid>
    </div>
  );
}

export default Loginhome;


