import { AppBar, Button, Grid, Toolbar, Typography, Box } from '@mui/material'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function SummaryTopBar() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/home');
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
                    Powrót do koszyka
                </Button>
            </Toolbar>
        </AppBar>
    );
}
