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
import { useState } from 'react';
import axios from 'axios';
// import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import {ReactFacebookFailureResponse, ReactFacebookLoginInfo} from "react-facebook-login";

const theme = createTheme();

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
    }
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

    const onChangeForm = (key: string, value: any) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [key]: value,
        }));
      };
        
            const registerNewUser = () => {
                axios.post("http://localhost:8080/persons", formData)
                  .then(() => {
                    navigate('/loginhome');
                  }).catch(e => console.log(e));
              };

//     // const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
//     //     if ('accessToken' in response) {
//     //         console.log(response.accessToken);
//     //         navigate('/loginhome');
//     //     } else {
//     //         console.log('Nie udało się zalogować przez Facebooka');
//     //     }
//     // }


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
                            id="email"
                            label="Adres email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={e => onChangeForm('email', e.target.value)}
                        />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                value={formData.password}
                                onChange={e => onChangeForm('password', e.target.value)}
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Imie"
                            name="name"
                            autoComplete="Imie"
                            autoFocus
                            value={formData.name}
                            onChange={e => onChangeForm('name', e.target.value)}
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="surname"
                            label="Surname"
                            name="surname"
                            autoComplete="Nazwisko"
                            autoFocus
                            value={formData.surname}
                            onChange={e => onChangeForm('surname', e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="phoneNumber"
                            name="phoneNumber"
                            autoComplete="Nr telefonu"
                            autoFocus
                            value={formData.phoneNumber}
                            onChange={e => onChangeForm('phoneNumber', e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="state"
                            name="state"
                            autoComplete="Województwo"
                            autoFocus
                            value={formData.address.state}
                            onChange={e => onChangeForm('address', { ...formData.address, state: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="city"
                            name="city"
                            autoComplete="Miasto"
                            autoFocus
                            value={formData.address.city}
                            onChange={e => onChangeForm('address', { ...formData.address, city: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="street"
                            label="street"
                            name="street"
                            autoComplete="Ulica"
                            autoFocus
                            value={formData.address.street}
                            onChange={e => onChangeForm('address', { ...formData.address, street: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="postCode"
                            label="postCode"
                            name="postCode"
                            autoComplete="Kod pocztowy"
                            autoFocus
                            value={formData.address.postCode}
                            onChange={e => onChangeForm('address', { ...formData.address, postCode: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="apartment"
                            label="apartment"
                            name="apartment"
                            autoComplete="Nr domu"
                            autoFocus
                            value={formData.address.apartment}
                            onChange={e => onChangeForm('address', { ...formData.address, apartment: e.target.value })}
                        />
                            {/*<FacebookLogin*/}
                            {/*    appId="3179163212375828"*/}
                            {/*    autoLoad={false}*/}
                            {/*    fields="name,email,picture"*/}
                            {/*    callback={responseFacebook}*/}
                            {/*    render={(renderProps: { onClick: () => void; }) => (*/}
                            {/*        <FacebookLoginButton onClick={renderProps.onClick} />*/}
                            {/*    )}*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                onClick={registerNewUser}
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
export default Register;