import * as React from 'react';
import Typography from '@mui/material/Typography';
import Admintopbar from './../topbar/Admintopbar';

function Adminprofil() {
  return (
    <div>
      <Admintopbar />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Profil
      </Typography>
    </div>
  );
}

export default Adminprofil;


