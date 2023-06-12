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

    const [errors, setErrors] = useState<Admin>({
        email: '',
        password: '',
    })

    const [isPasswordShown, setPasswordIsShown] = useState(false);

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

        if(!hasErrors){
            loginAdmin();
        }
    }

    const loginAdmin = () => {
        axios
            .post('http://localhost:8080/admin/login', formData)
            .then((response) => {
                if (response.data) {
                    localStorage.setItem('admin', response.data);
                    navigate('/adminhome');
                } else {
                    console.log('Empty response data');
                }
            })
            .catch((error) => {
                alert('Nieprawidłowe dane logowania lub administrator nie istnieje');
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