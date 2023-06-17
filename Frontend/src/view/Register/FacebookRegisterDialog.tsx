import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import { useState } from "react";
import PersonInterface from "../shared/PersonInterface";

interface FacebookRegisterDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
    onChangeForm: (key: string, value: any) => void;
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    //handleErrors: (e: React.FormEvent) => void;
    facebookFormData: PersonInterface;
    registerNewUser: () => void;
    //errors: PersonInterface;
}

const FacebookRegisterDialog = (props: FacebookRegisterDialogProps) => {
    const [emptyFieldsDialog, setEmptyFieldsDialog] = useState<string[]>([]);

    const [errors, setErrors] = useState({
        phoneNumber: '',
        address: {
            state: '',
            city: '',
            street: '',
            postCode: '',
            apartment: '',
        },
    })

    const handleClose = () => {
        props.handleCloseDialog();
        setEmptyFieldsDialog([]);
    }

    const validatePhoneNumber = (value: string) => {
        const phoneNumberRegex = /^\d{9}$/;
        return phoneNumberRegex.test(value);
    };

    const handleErrors = (e: React.FormEvent) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors: any = {};

        if (!props.facebookFormData.phoneNumber) {
            newErrors.phoneNumber = 'Pole Numer telefonu nie może być puste'
            hasErrors = true;
        } else if (!validatePhoneNumber(props.facebookFormData.phoneNumber)) {
            newErrors.phoneNumber = 'Numer telefonu powinien składać się tylko z cyfr i mieć maksymalnie 9 cyfr';
            hasErrors = true;
        }

        if (!props.facebookFormData.address.state) {
            newErrors.address = { ...newErrors.address, state: 'Pole Województwo nie może być puste' };
            hasErrors = true;
          }
      
          if (!props.facebookFormData.address.city) {
            newErrors.address = { ...newErrors.address, city: 'Pole Miasto nie może być puste' };
            hasErrors = true;
          }
      
          if (!props.facebookFormData.address.street) {
            newErrors.address = { ...newErrors.address, street: 'Pole Ulica nie może być puste' };
            hasErrors = true;
          }
      
          if (!props.facebookFormData.address.postCode) {
            newErrors.address = { ...newErrors.address, postCode: 'Pole Kod pocztowy nie może być puste' };
            hasErrors = true;
          }

          if (!props.facebookFormData.address.apartment) {
            newErrors.address = { ...newErrors.address, apartment: 'Pole Numer domu nie może być puste' };
            hasErrors = true;
          }

        setErrors(newErrors);

        if(!hasErrors){
            props.registerNewUser();
        }
    }

    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <Dialog open={props.openDialog} onClose={props.handleCloseDialog}>
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
                        value={props.facebookFormData.phoneNumber}
                        onChange={(e) => props.onChangeForm('phoneNumber', e.target.value)}
                    />
                    {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="state"
                        label="Województwo"
                        name="state"
                        autoComplete="Województwo"
                        value={props.facebookFormData.address.state}
                        onChange={ props.handleAddressChange }
                    />
                    {errors.address && errors.address.state && <span>{errors.address.state}</span>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Miasto"
                        name="city"
                        autoComplete="Miasto"
                        value={props.facebookFormData.address.city}
                        onChange={ props.handleAddressChange }
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
                        value={props.facebookFormData.address.street}
                        onChange={ props.handleAddressChange }
                    />
                    {errors.address && errors.address.street && <span>{errors.address.street}</span>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Kod pocztowy"
                        name="postCode"
                        autoComplete="Kod pocztowy"
                        value={props.facebookFormData.address.postCode}
                        onChange={ props.handleAddressChange }
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
                        value={props.facebookFormData.address.apartment}
                        onChange={ props.handleAddressChange }
                    />
                    {errors.address && errors.address.apartment && <span>{errors.address.apartment}</span>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anuluj</Button>
                    <Button onClick={handleErrors}>Utwórz konto</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FacebookRegisterDialog;