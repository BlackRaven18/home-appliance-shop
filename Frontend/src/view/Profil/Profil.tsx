import * as React from 'react';
import Typography from '@mui/material/Typography';
import Topbar from '../../topbar/Topbar';
import Profillist from './Profillist';

function Profil() {
    return (
        <div>
            <Topbar />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Profil
            </Typography>
            <Profillist/>
        </div>
    );
}

export default Profil;
