import * as React from 'react';
import Typography from '@mui/material/Typography';
import Admintopbar from '../../topbar/Admintopbar';
import Profillist from './Profillist';

function Adminprofil() {
  return (
    <div>
      <Admintopbar />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Profil
      </Typography>
      <Profillist/>
    </div>
  );
}

export default Adminprofil;


