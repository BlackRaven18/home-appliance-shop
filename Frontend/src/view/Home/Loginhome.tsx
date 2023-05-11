import { Grid } from '@mui/material';
import Topbar from '../../topbar/Topbar';
import Products from '../Product/Products';
import Categorylist from "./Categorylist";

function Loginhome() {

  return (
    <div>
      <Topbar />
      <Grid container spacing={2} sx={{ height: '100vh' }}>
        <Categorylist />
        <Grid item xs={12} md={10} sx={{ marginTop: '5px' }}>
          <Products />
        </Grid>
      </Grid>
    </div>
  );
}

export default Loginhome;
