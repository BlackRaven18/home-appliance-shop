import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMaterial from '@mui/material/Link';
import { Link, useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {ReactFacebookFailureResponse, ReactFacebookLoginInfo} from "react-facebook-login";



const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });

            navigate('/loginhome');

        };
    const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
        if ('accessToken' in response) {
            console.log(response.accessToken);
            navigate('/loginhome');
        } else {
            console.log('Nie udało się zalogować przez Facebooka');
        }
    }
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Adres email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Imię"
                                id="name"
                                autoComplete="Imię"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="surname"
                                label="Nazwisko"
                                id="surname"
                                autoComplete="Nazwisko"
                            />
                            <FacebookLogin
                                appId="3179163212375828"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                render={(renderProps: { onClick: () => void; }) => (
                                    <FacebookLoginButton onClick={renderProps.onClick} />
                                )}
                            />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Zarejestruj się
                                    </Button>
                            <Grid container>

                                <Grid item>
                                    <LinkMaterial href="#" variant="body2">
                                        <Link to='/login'>
                                            {"Wróć do logowania"}
                                        </Link>
                                    </LinkMaterial>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
