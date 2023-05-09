import Notloggedintopbar from './../topbar/Notloggedintopbar';
import * as React from 'react';
import Product from './../view/Product';
import { Grid } from '@mui/material';
import Categorylist from "./Categorylist";



function Loginhome() {
  const [activeCategory, setActiveCategory] = React.useState('');

  return (
      <div>
        <Notloggedintopbar />
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


