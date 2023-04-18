import * as React from 'react';
import Typography from '@mui/material/Typography';
import Topbar from './../topbar/Topbar';

function Koszyk() {
  return (
    <div>
      <Topbar />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Koszyk
      </Typography>
    </div>
  );
}

export default Koszyk;


