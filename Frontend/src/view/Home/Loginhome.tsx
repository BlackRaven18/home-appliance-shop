import * as React from 'react';
import Topbar from '../../topbar/Topbar';
import Product from '../Product/Product';
import { Grid } from '@mui/material';
import Categorylist from "./Categorylist";

function Loginhome() {

  return (
      <div>
        <Topbar />
          <Grid container spacing={2} sx={{ height: '100vh' }}>
        <Categorylist/>
        <Grid item xs={12} md={10} sx={{marginTop: '5px'}}>
            <Product />
        </Grid>
          </Grid>
      </div>
  );
}

export default Loginhome;
