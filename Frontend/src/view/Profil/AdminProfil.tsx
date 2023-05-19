import * as React from 'react';
import Typography from '@mui/material/Typography';
import AdminTopBar from '../../TopBar/AdminTopBar';
import ProfilList from './ProfilList';

function AdminProfil() {
  return (
    <div>
      <AdminTopBar />
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Profil
      </Typography>
      <ProfilList/>
    </div>
  );
}

export default AdminProfil;


