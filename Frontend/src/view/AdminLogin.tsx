import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import UserDataManager from '../UserDataManager/UserDataManager';
import CustomBackdrop from './CustomBackdrop';


const theme = createTheme();

interface Admin {
    email: string;
    password: string;
}

export default function AdminLogin() {
    const navigate = useNavigate();
    const [isPasswordShown, setPasswordIsShown] = useState(false)
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    const [formData, setFormData] = useState<Admin>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Admin>({
        email: '',
        password: '',
    })



    const onChangeForm = (key: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
    }

    const handleErrors = (e: React.FormEvent) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors: any = {};

        if (!formData.email) {
            newErrors.email = 'Pole Email nie może być puste';
            hasErrors = true;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Podaj prawidłowy adres email';
            hasErrors = true;
        }

        if (!formData.password) {
            newErrors.password = 'Pole Hasło nie może być puste';
            hasErrors = true;
        }
        setErrors(newErrors);

        if (!hasErrors) {
            loginAdmin();
        }
    }

    const loginAdmin = () => {

        setIsWaitingForResponse(true);

        axios
            .post('http://localhost:8080/admin/login', formData, {
                auth: {
                    username: formData.email,
                    password: formData.password
                }
            })
            .then((response) => {

                if (response.data) {
                    UserDataManager.setId(response.data);
                    UserDataManager.setUsername(formData.email);
                    UserDataManager.setPassword(formData.password);

                    navigate('/adminhome');
                } else {
                    console.log('Empty response data');
                }
            })
            .catch((error) => {
                alert('Nieprawidłowe dane logowania lub administrator nie istnieje');
            })
            .finally(() => {
                setIsWaitingForResponse(false)
            });
    };

    return (
        <ThemeProvider theme={theme}>

            {isWaitingForResponse ? (
                <CustomBackdrop label='Oczekiwanie na odpowiedź serwera...' />
            ) : (<></>)}

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://picsum.photos/1000/600)',
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
                            />
                            {errors.email && <span>{errors.email}</span>}
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
                            />
                            {errors.password && <span>{errors.password}</span>}
                            <br />
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
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleErrors}
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