import * as React from 'react';
import Typography from '@mui/material/Typography';
import TopBar from '../../TopBar/TopBar';
import ProfilList from './ProfilList';

function Profil() {
    return (
        <div>
            <TopBar />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Profil
            </Typography>
            <ProfilList/>
        </div>
    );
}

export default Profil;
