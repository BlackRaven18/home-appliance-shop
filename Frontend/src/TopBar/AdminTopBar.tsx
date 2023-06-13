import { Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import UserDataManager from '../UserDataManager/UserDataManager';

export default function AdminTopBar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        UserDataManager.clearData();
        
        navigate('/adminLogin');
        console.log("Logged out");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <span style={{ background: 'yellow', borderRadius: '40px', padding: '20px 15px', color: 'black', width: '100%' }}>Lodóweczka</span>
                </Typography>

                <Button color="inherit" component={Link} to="/AdminHome">
                    Strona główna
                </Button>
                <Button color="inherit" component={Link} to="/adminprofil">
                    Profil
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Wyloguj
                </Button>
            </Toolbar>
        </AppBar>
    );
}
