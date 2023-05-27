import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSocialFacebook, IResolveParams } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
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
    const [openDialog, setOpenDialog] = useState(false);

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

    const [facebookFormData, setFacebookFormData] = useState<Person>({
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

    const postUser = () => {
        const postData = isFacebookLogging ? facebookFormData : formData;
        axios
            .post('http://localhost:8080/persons', postData)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/loginhome');
            })
            .catch((error) => {
                console.log(error.response.data);
                setErrorMessages([error.response.data]);
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
        else{
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
        }
 
        postUser();
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
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>Register</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Podaj pozostałe dane logowania.
                                    </DialogContentText>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Numer telefonu"
                                        name="phoneNumber"
                                        autoComplete="Nr telefonu"
                                        value={facebookFormData.phoneNumber}
                                        onChange={(e) => onChangeForm('phoneNumber', e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Województwo"
                                        name="state"
                                        autoComplete="Województwo"
                                        value={facebookFormData.address.state}
                                        onChange={(e) =>
                                            onChangeForm('address', { ...facebookFormData.address, state: e.target.value })
                                        }
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="city"
                                        label="Miasto"
                                        name="city"
                                        autoComplete="Miasto"
                                        value={facebookFormData.address.city}
                                        onChange={(e) =>
                                            onChangeForm('address', { ...facebookFormData.address, city: e.target.value })
                                        }
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="street"
                                        label="Ulica"
                                        name="street"
                                        autoComplete="Ulica"
                                        value={facebookFormData.address.street}
                                        onChange={(e) =>
                                            onChangeForm('address', { ...facebookFormData.address, street: e.target.value })
                                        }
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="postCode"
                                        label="Kod pocztowy"
                                        name="postCode"
                                        autoComplete="Kod pocztowy"
                                        value={facebookFormData.address.postCode}
                                        onChange={(e) =>
                                            onChangeForm('address', { ...facebookFormData.address, postCode: e.target.value })
                                        }
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="apartment"
                                        label="Numer domu"
                                        name="apartment"
                                        autoComplete="Numer domu"
                                        value={facebookFormData.address.apartment}
                                        onChange={(e) =>
                                            onChangeForm('address', { ...facebookFormData.address, apartment: e.target.value })
                                        }
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>Anuluj</Button>
                                    <Button onClick={registerNewUser}>Utwórz konto</Button>
                                </DialogActions>
                            </Dialog>
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
                                type={isPasswordShown ? 'text' : 'password'}
                                id="password"
                                label="Hasło"
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
                                label="Nazwisko"
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
                                label="Numer telefonu"
                                name="phoneNumber"
                                autoComplete="Numer telefonu"
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
                                label="Wojewójdztwo"
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
                                label="Miasto"
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
                                label="Ulica"
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
                                label="Kod pocztowy"
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
                                label="Numer domu"
                                name="apartment"
                                autoComplete="Numer domu"
                                value={formData.address.apartment}
                                onChange={(e) =>
                                    onChangeForm('address', { ...formData.address, apartment: e.target.value })
                                }
                                error={errorMessages.includes('address.apartment')}
                                helperText={
                                    errorMessages.includes('address.apartment') ? 'Pole nie może być puste' : ''
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
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={registerNewUser}
                            >
                                Zarejestruj się
                            </Button>
                            <LoginSocialFacebook
                                appId={'3179163212375828'}
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
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Register;
