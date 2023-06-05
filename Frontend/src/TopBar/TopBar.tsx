import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { RootState } from '../redux/store';


export default function TopBar() {

    const navigate = useNavigate();

    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);

    const goToHome = () => {
        navigate('/loginhome');
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        if (localStorage.getItem("user") === null) {
            navigate('/login');
            console.log("Logged out");
        }
        else {
            console.error("An error occurred while logging out");
        }
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
                    {shoppingCart.productsNumber > 0 ?
                        <p>({shoppingCart.productsNumber})</p> :
                        <p></p>}
                </Button>
                <Button color="inherit" component={Link} to="/history">
                    Historia
                </Button>
                <Button color="inherit" component={Link} to="/profil">
                    Profil
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Wyloguj
                </Button>
            </Toolbar>
        </AppBar>
    );
}
