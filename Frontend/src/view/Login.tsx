import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
    List,
    ListItem,
} from '@mui/material';

const theme = createTheme();

interface Person {
    email: string;
    password: string;
}

interface ErrorMessageProps {
    message: string;
  }

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Person>({
        email: '',
        password: '',
    });

    const [serverErrorMessage, setServerErrorMessage] = useState('');
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

      const ServerErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
        <div>
          <p className="text-rose-600 font-medium">{message}</p>
        </div>
      );

    const onChangeForm = (key: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    const loginUser = () => {
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

        axios
            .post('http://localhost:8080/persons/login', formData)
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate('/loginhome');
                } else {
                    console.log('Empty response data');
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                setErrorMessages([error.response.data]);
                setServerErrorMessage(error.response.data);
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
                            Zaloguj się
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
                                control={<Checkbox value="remember" color="primary" />}
                                label="Pokaż hasło"
                            />
                            {/* <FacebookLoginButton /> */}
                            {serverErrorMessage && serverErrorMessage.includes('Invalid login details or user does not exist') ? (
                                <ServerErrorMessage message="Nieprawidłowe dane logowania lub użytkownik nie istnieje" />
                            ) : null}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={loginUser}
                            >
                                Zaloguj
                            </Button>
                            <List>
                                <ListItem>
                                    <NavLink to='/register'>
                                        Nie masz konta? Zarejestruj się!
                                    </NavLink>
                                </ListItem>
                                <ListItem>
                                    <Link to='/adminLogin'>
                                        {"Jestem administratorem"}
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link to='/home'>
                                        {"Wejdź jako niezalogowany"}
                                    </Link>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

export default Login;