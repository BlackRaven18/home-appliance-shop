import * as React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function AdminTopBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <span style={{background: 'yellow', borderRadius: '40px', padding: '20px 15px', color: 'black'}}>Lodóweczka admin</span>
                </Typography>

                <Button color="inherit" component={Link} to="/AdminHome">
                    Strona główna
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Logowanie
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Rejestracja
                </Button>
                <Button color="inherit" component={Link} to="/adminprofil">
                    Profil
                </Button>
                <Grid item>
                    <Link to='/login'>
                        {"Wyloguj się"}
                    </Link>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
