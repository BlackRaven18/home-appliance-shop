import * as React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Paper,
    Box,
    Grid,
    Typography,
    List,
    ListItem,
} from '@mui/material';


const theme = createTheme();

interface Admin {
    email: string;
    password: string;
}

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Admin>({
        email: '',
        password: '',
    });

    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [isPasswordShown, setPasswordIsShown] = useState(false)


    const onChangeForm = (key: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const loginAdmin = async () => {
        setErrorMessages([]);

        const emptyFields = Object.entries(formData).filter(([key, value]) => {
            if (typeof value === 'string') {
                return value.trim() === '';
            }
            return false;
        });

        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.map(([key]) => key);
            setErrorMessages([...emptyFieldNames, 'Wprowadź wartości w powyższych polach']);
            return;
        }

        await axios
            .post('http://localhost:8080/admin/login', formData, {
                auth: {
                    username: formData.email,
                    password: formData.password
                }
            })
            .then((response) => {

                if (response.data) {
                    localStorage.setItem('admin', response.data);
                    navigate('/adminhome');
                } else {
                    console.log('Empty response data');
                }
            })
            .catch((error) => {
                switch(error.response.status){
                    case 401: setServerErrorMessage("Nie znaleziono użytkownika: Error 401"); break;
                    case 403: setServerErrorMessage("Brak dostępu: Error 403"); break;
                    case 404: setServerErrorMessage("Nie znaleziono: Error 404"); break;
                }
               
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Zaloguj się jako administrator
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Adres email"
                                value={formData.email}
                                onChange={(e) => onChangeForm('email', e.target.value)}
                                error={
                                    errorMessages.includes('email')
                                }
                                helperText={
                                    errorMessages.includes('email') ?
                                        'Pole nie może być puste' :
                                        ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type={isPasswordShown ? 'text' : 'password'}
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                value={formData.password}
                                onChange={(e) => onChangeForm('password', e.target.value)}
                                error={errorMessages.includes('password')}
                                helperText={
                                    errorMessages.includes('password') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={isPasswordShown}
                                        onChange={() => setPasswordIsShown(!isPasswordShown)}
                                        color="primary"
                                    />
                                }
                                label="Pokaż hasło"
                            />
                            {serverErrorMessage ? (
                                <p>{serverErrorMessage}</p>
                            ) : (<p></p>)}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={loginAdmin}
                            >
                                Zaloguj się
                            </Button>
                            <List>
                                <ListItem>
                                    <NavLink to='/home'>
                                        Powrót do strony głównej
                                    </NavLink>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}