import { AppBar, Button, Grid, Toolbar, Typography, Box } from '@mui/material'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Topbar() {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/loginhome');
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <Box
                    onClick={goToHome}
                    sx={{
                        flexGrow: 1,
                        cursor: 'pointer',
                    }}
                >
                    <Typography variant="h6">
                        <span style={{ background: 'yellow', borderRadius: '40px', padding: '20px 15px', color: 'black' }}>Lodóweczka</span>
                    </Typography>
                </Box>

                <Button color="inherit" component={Link} to="/loginhome">
                    Strona główna
                </Button>
                <Button color="inherit" component={Link} to="/shoppingcart">
                    Koszyk
                </Button>
                <Button color="inherit" component={Link} to="/history">
                    Historia
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Logowanie
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Rejestracja
                </Button>
                <Button color="inherit" component={Link} to="/profil">
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
