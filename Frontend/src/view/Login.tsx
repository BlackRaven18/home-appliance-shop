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
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';
import UserDataManager from '../UserDataManager/UserDataManager';
import CustomBackdrop from './CustomBackdrop';

const theme = createTheme();

interface Person {
    email: string;
    password: string;
}

interface FacebookResponseI {
    id: string,
    firstName: string,
    lastName: string
    email: string,
}

const Login = () => {
    const [isFacebookLogging, setFacebookLogging] = useState(false);
    const [isPasswordShown, setPasswordIsShown] = useState(false);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState<Person>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Person>({
        email: '',
        password: '',
    })

    const validateEmail = (value: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
    }

    const handleFacebookLogin = (facebookResponse: FacebookResponseI) => {

        setIsWaitingForResponse(true);

        axios
            .post('http://localhost:8080/persons/login',
                {
                    email: facebookResponse.email,
                    password: facebookResponse.id,
                })
            .then((response) => {

                UserDataManager.setId(response.data);
                UserDataManager.setUsername(facebookResponse.email);
                UserDataManager.setPassword(facebookResponse.id);

                UserDataManager.TEST_printData();

                navigate('/loginhome');
            })
            .catch((error) => {
                alert('Wystąpił błąd podczas logowania');
            })
            .finally(() => {
                setIsWaitingForResponse(false);
            });
    };

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
            loginUser();
        }
    }

    const handleOnRejectFacebookLogin = () => {
        setFacebookLogging(false);
    }

    const onChangeForm = (key: string, value: any) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: value,
        }));
    };
    const postUser = async () => {
        const postData = formData;

        setIsWaitingForResponse(true);

        await axios
            .post('http://localhost:8080/persons/login', postData)
            .then((response) => {

                UserDataManager.setId(response.data);
                UserDataManager.setUsername(postData.email);
                UserDataManager.setPassword(postData.password);

                UserDataManager.TEST_printData();

                navigate('/loginhome');

            })
            .catch((error) => {
                alert('Nieprawidłowe dane logowania lub użytkownik nie istnieje');
            }).finally(() => {
                setIsWaitingForResponse(false);
            });
    }

    const loginUser = () => {
        postUser();
    };

    return (
        <ThemeProvider theme={theme}>

            {isWaitingForResponse? (
                <CustomBackdrop label='Oczekiwanie na odpowiedź serwera...'/>
            ) : (<></>)}

            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://i.imgur.com/YLJCGr5.png)',
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
                            < br />
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
                                Zaloguj
                            </Button>
                            <LoginSocialFacebook
                                appId={process.env.REACT_APP_FACEBOOK_ID ?? ""}
                                onResolve={({ provider, data }: IResolveParams) => {
                                    if (data) {
                                        handleFacebookLogin({
                                            id: data.id,
                                            firstName: data.first_name,
                                            lastName: data.last_name,
                                            email: data.email,
                                        })

                                    }
                                }}
                                onReject={(err) => {
                                    handleOnRejectFacebookLogin();
                                    console.log(err);
                                }}
                            >
                                <FacebookLoginButton />
                            </LoginSocialFacebook>
                            <List>
                                <ListItem>
                                    <NavLink to='/register'>
                                        Nie masz konta? Zarejestruj się!
                                    </NavLink>
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
