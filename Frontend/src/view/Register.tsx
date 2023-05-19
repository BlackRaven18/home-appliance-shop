import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from "react-social-login-buttons";

import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';

const theme = createTheme({});

interface Person {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: {
        state: string;
        city: string;
        street: string;
        postCode: string;
        apartment: string;
    };
    password: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Person>({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        address: {
            state: '',
            city: '',
            street: '',
            postCode: '',
            apartment: '',
        },
        password: '',
    });

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const ErrorMessage = () => (
        <div>
            {errorMessages.map((errorMessage, index) => (
                <p key={index} className="text-rose-600 font-medium">
                    {errorMessage}
                </p>
            ))}
        </div>
    );

    const onChangeForm = (key: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const registerNewUser = () => {
        setErrorMessages([]);

        const emptyFields = Object.entries(formData).filter(([key, value]) => {
            if (typeof value === 'string') {
                return value.trim() === '';
            } else if (typeof value === 'object') {
                return Object.values(value).some(
                    (addressFieldValue) => String(addressFieldValue).trim() === ''
                );
            }
            return false;
        });

        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.map(([key]) => key);
            setErrorMessages([...emptyFieldNames, 'Wprowadź wartości w powyższych polach']);
            return;
        }

        axios
            .post('http://localhost:8080/persons', formData)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/loginhome');
            })
            .catch((error) => {
                console.log(error.response.data);
                setErrorMessages([error.response.data]);
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
                            Zarejestruj się
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
                                    errorMessages.includes('Email already exists') ||
                                    errorMessages.includes('email')
                                }
                                helperText={
                                    errorMessages.includes('Email already exists') ?
                                        'Konto o podanym emailu już istnieje' :
                                        errorMessages.includes('email') ?
                                            'Pole nie może być puste' :
                                            ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Imie"
                                name="name"
                                autoComplete="Imie"
                                value={formData.name}
                                onChange={(e) => onChangeForm('name', e.target.value)}
                                error={errorMessages.includes('name')}
                                helperText={
                                    errorMessages.includes('name') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="surname"
                                label="Surname"
                                name="surname"
                                autoComplete="Nazwisko"
                                value={formData.surname}
                                onChange={(e) => onChangeForm('surname', e.target.value)}
                                error={errorMessages.includes('surname')}
                                helperText={
                                    errorMessages.includes('surname') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="phoneNumber"
                                name="phoneNumber"
                                autoComplete="Nr telefonu"
                                value={formData.phoneNumber}
                                onChange={(e) => onChangeForm('phoneNumber', e.target.value)}
                                error={errorMessages.includes('phoneNumber')}
                                helperText={
                                    errorMessages.includes('phoneNumber') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="state"
                                label="state"
                                name="state"
                                autoComplete="Województwo"
                                value={formData.address.state}
                                onChange={(e) =>
                                    onChangeForm('address', { ...formData.address, state: e.target.value })
                                }
                                error={errorMessages.includes('address.state')}
                                helperText={
                                    errorMessages.includes('address.state') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="city"
                                label="city"
                                name="city"
                                autoComplete="Miasto"
                                value={formData.address.city}
                                onChange={(e) =>
                                    onChangeForm('address', { ...formData.address, city: e.target.value })
                                }
                                error={errorMessages.includes('address.city')}
                                helperText={
                                    errorMessages.includes('address.city') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="street"
                                label="street"
                                name="street"
                                autoComplete="Ulica"
                                value={formData.address.street}
                                onChange={(e) =>
                                    onChangeForm('address', { ...formData.address, street: e.target.value })
                                }
                                error={errorMessages.includes('address.street')}
                                helperText={
                                    errorMessages.includes('address.street') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="postCode"
                                label="postCode"
                                name="postCode"
                                autoComplete="Kod pocztowy"
                                value={formData.address.postCode}
                                onChange={(e) =>
                                    onChangeForm('address', { ...formData.address, postCode: e.target.value })
                                }
                                error={errorMessages.includes('address.postCode')}
                                helperText={
                                    errorMessages.includes('address.postCode') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="apartment"
                                label="apartment"
                                name="apartment"
                                autoComplete="Nr domu"
                                value={formData.address.apartment}
                                onChange={(e) =>
                                    onChangeForm('address', { ...formData.address, apartment: e.target.value })
                                }
                                error={errorMessages.includes('address.apartment')}
                                helperText={
                                    errorMessages.includes('address.apartment') ? 'Pole nie może być puste' : ''
                                }
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={registerNewUser}
                            >
                                Zarejestruj się
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/login">
                                        {'Masz już konto? Zaloguj się'}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Register;
