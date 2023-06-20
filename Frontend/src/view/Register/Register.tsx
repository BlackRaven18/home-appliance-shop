import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
    Typography
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login';
import FacebookRegisterDialog from './FacebookRegisterDialog';
import PersonInterface from '../shared/PersonInterface';
import UserDataManager from '../../UserDataManager/UserDataManager';
import CustomBackdrop from '../CustomBackdrop';

const theme = createTheme({});


const Register = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setFacebookLogging(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFacebookLogging(false);
    };

    const [isFacebookLogging, setFacebookLogging] = useState(false);
    const [facebookLoginData, setFacebookLoginData] = useState<any>();
    const [isPasswordShown, setPasswordIsShown] = useState(false);

    const [formData, setFormData] = useState<PersonInterface>({
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

    const [facebookFormData, setFacebookFormData] = useState<PersonInterface>({
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

    const [errors, setErrors] = useState<PersonInterface>({
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
    })

    const validateEmail = (value: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value);
    }

    const validatePassword = (value: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(value);
    };

    const validatePhoneNumber = (value: string) => {
        const phoneNumberRegex = /^\d{9}$/;
        return phoneNumberRegex.test(value);
    };

    const onChangeForm = (key: string, value: any) => {
        if (isFacebookLogging === true) {
            setFacebookFormData((prevFacebookData) => ({
                ...prevFacebookData,
                [key]: value,
            }));
        }
        else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [key]: value,
            }));
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (isFacebookLogging) {
            setFacebookFormData((prevFacebookData) => ({
                ...prevFacebookData,
                address: {
                    ...prevFacebookData.address,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    [name]: value,
                },
            }));
        }
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
        } else if (!validatePassword(formData.password)) {
            newErrors.password =
                'Hasło powinno zawierać minimum 6 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny';
            hasErrors = true;
        }

        if (!formData.name) {
            newErrors.name = 'Pole Imię nie może być puste';
            hasErrors = true;
        } else if (/\d/.test(formData.name)) {
            newErrors.name = 'Imię nie może zawierać cyfr';
            hasErrors = true;
        }

        if (!formData.surname) {
            newErrors.surname = 'Pole Nazwisko nie może być puste';
            hasErrors = true;
        } else if (/\d/.test(formData.surname)) {
            newErrors.surname = 'Nazwisko nie może zawierać cyfr';
            hasErrors = true;
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Pole Numer telefonu nie może być puste'
            hasErrors = true;
        } else if (!validatePhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Numer telefonu powinien składać się tylko z cyfr i mieć maksymalnie 9 cyfr';
            hasErrors = true;
        }

        if (!formData.address.state) {
            newErrors.address = { ...newErrors.address, state: 'Pole Województwo nie może być puste' };
            hasErrors = true;
        }

        if (!formData.address.city) {
            newErrors.address = { ...newErrors.address, city: 'Pole Miasto nie może być puste' };
            hasErrors = true;
        }

        if (!formData.address.street) {
            newErrors.address = { ...newErrors.address, street: 'Pole Ulica nie może być puste' };
            hasErrors = true;
        }

        if (!formData.address.postCode) {
            newErrors.address = { ...newErrors.address, postCode: 'Pole Kod pocztowy nie może być puste' };
            hasErrors = true;
        }

        if (!formData.address.apartment) {
            newErrors.address = { ...newErrors.address, apartment: 'Pole Numer domu nie może być puste' };
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            registerNewUser();
        }
    }

    const postUser = () => {
        const postData = isFacebookLogging ? facebookFormData : formData;

        setIsWaitingForResponse(true);

        axios
            .post('http://localhost:8080/persons', postData)
            .then((response) => {
                UserDataManager.setId(response.data);
                UserDataManager.setUsername(postData.email);
                UserDataManager.setPassword(postData.password);

                navigate('/loginhome');
            })
            .catch((error) => {
                console.log(error.response.data);
                if (error.response.data === 'Email already exists') {
                    alert('Podany email już istnieje');
                }
            })
            .finally(() => {
                setIsWaitingForResponse(false);
            });
    }

    const registerFacebookUser = () => {
        facebookFormData.name = facebookLoginData.first_name;
        facebookFormData.surname = facebookLoginData.last_name;
        facebookFormData.email = facebookLoginData.email;
        facebookFormData.password = facebookLoginData.id;
    }

    const registerNewUser = () => {
        if (isFacebookLogging === true) {
            registerFacebookUser();

            handleCloseDialog();
        }

        postUser();
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
                            Zarejestruj się
                        </Typography>

                        <FacebookRegisterDialog
                            openDialog={openDialog}
                            handleCloseDialog={handleCloseDialog}
                            onChangeForm={onChangeForm}
                            handleAddressChange={handleAddressChange}
                            facebookFormData={facebookFormData}
                            registerNewUser={registerNewUser}
                        />
                        <form>
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
                                label="Hasło"
                                name="password"
                                autoComplete="password"
                                value={formData.password}
                                onChange={(e) => onChangeForm('password', e.target.value)}
                            />
                            {errors.password && <span>{errors.password}</span>}
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
                            />
                            {errors.name && <span>{errors.name}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="surname"
                                label="Nazwisko"
                                name="surname"
                                autoComplete="Nazwisko"
                                value={formData.surname}
                                onChange={(e) => onChangeForm('surname', e.target.value)}
                            />
                            {errors.surname && <span>{errors.surname}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Numer telefonu"
                                name="phoneNumber"
                                autoComplete="Numer telefonu"
                                value={formData.phoneNumber}
                                onChange={(e) => onChangeForm('phoneNumber', e.target.value)}
                            />
                            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="state"
                                label="Wojewójdztwo"
                                name="state"
                                autoComplete="Województwo"
                                value={formData.address.state}
                                onChange={handleAddressChange}
                            />
                            {errors.address && errors.address.state && <span>{errors.address.state}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="city"
                                label="Miasto"
                                name="city"
                                autoComplete="Miasto"
                                value={formData.address.city}
                                onChange={handleAddressChange}
                            />
                            {errors.address && errors.address.city && <span>{errors.address.city}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="street"
                                label="Ulica"
                                name="street"
                                autoComplete="Ulica"
                                value={formData.address.street}
                                onChange={handleAddressChange}
                            />
                            {errors.address && errors.address.street && <span>{errors.address.street}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="postCode"
                                label="Kod pocztowy"
                                name="postCode"
                                autoComplete="Kod pocztowy"
                                value={formData.address.postCode}
                                onChange={handleAddressChange}
                            />
                            {errors.address && errors.address.postCode && <span>{errors.address.postCode}</span>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="apartment"
                                label="Numer domu"
                                name="apartment"
                                autoComplete="Numer domu"
                                value={formData.address.apartment}
                                onChange={handleAddressChange}
                            />
                            {errors.address && errors.address.apartment && <span>{errors.address.apartment}</span>}
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
                                Zarejestruj się
                            </Button>
                        </form>
                        <LoginSocialFacebook
                            appId={process.env.REACT_APP_FACEBOOK_ID ?? ""}
                            fieldsProfile='email, first_name, last_name'
                            onResolve={({ provider, data }: IResolveParams) => {
                                setFacebookLoginData(data);
                                handleOpenDialog();
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <FacebookLoginButton />
                        </LoginSocialFacebook>
                        <Grid container>
                            <Grid item>
                                <Link to="/login">
                                    {'Masz już konto? Zaloguj się'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Register;