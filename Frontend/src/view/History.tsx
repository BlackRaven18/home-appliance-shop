import * as React from 'react';
import Typography from '@mui/material/Typography';
import TopBar from '../TopBar/TopBar';

function History() {
    return (
        <div>
            <TopBar />
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Historia
            </Typography>
        </div>
    );
}

export default History;