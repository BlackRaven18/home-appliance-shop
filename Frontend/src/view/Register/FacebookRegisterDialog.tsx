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

interface FacebookRegisterDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
    registerNewUser: () => void;
    onChangeForm: (key: string, value: any) => void;
    facebookFormData: Person;
}



const FacebookRegisterDialog = (props: FacebookRegisterDialogProps) => {
    const [emptyFieldsDialog, setEmptyFieldsDialog] = useState<string[]>([]);

    const handleClose = () => {
        props.handleCloseDialog();
        setEmptyFieldsDialog([]);
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
                        error={emptyFieldsDialog.includes('phoneNumber')}
                        helperText={
                            emptyFieldsDialog.includes('phoneNumber') ? 'Pole nie może być puste' : ''
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Województwo"
                        name="state"
                        autoComplete="Województwo"
                        value={props.facebookFormData.address.state}
                        onChange={(e) =>
                            props.onChangeForm('address', { ...props.facebookFormData.address, state: e.target.value })
                        }
                        error={emptyFieldsDialog.includes('address.state')}
                        helperText={
                            emptyFieldsDialog.includes('address.state') ? 'Pole nie może być puste' : ''
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Miasto"
                        name="city"
                        autoComplete="Miasto"
                        value={props.facebookFormData.address.city}
                        onChange={(e) =>
                            props.onChangeForm('address', { ...props.facebookFormData.address, city: e.target.value })
                        }
                        error={emptyFieldsDialog.includes('address.city')}
                        helperText={
                            emptyFieldsDialog.includes('address.city') ? 'Pole nie może być puste' : ''
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
                        value={props.facebookFormData.address.street}
                        onChange={(e) =>
                            props.onChangeForm('address', { ...props.facebookFormData.address, street: e.target.value })
                        }
                        error={emptyFieldsDialog.includes('address.street')}
                        helperText={
                            emptyFieldsDialog.includes('address.street') ? 'Pole nie może być puste' : ''
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Kod pocztowy"
                        name="postCode"
                        autoComplete="Kod pocztowy"
                        value={props.facebookFormData.address.postCode}
                        onChange={(e) =>
                            props.onChangeForm('address', { ...props.facebookFormData.address, postCode: e.target.value })
                        }
                        error={emptyFieldsDialog.includes('address.postCode')}
                        helperText={
                            emptyFieldsDialog.includes('address.postCode') ? 'Pole nie może być puste' : ''
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
                        value={props.facebookFormData.address.apartment}
                        onChange={(e) =>
                            props.onChangeForm('address', { ...props.facebookFormData.address, apartment: e.target.value })
                        }
                        error={emptyFieldsDialog.includes('address.apartment')}
                        helperText={
                            emptyFieldsDialog.includes('address.apartment') ? 'Pole nie może być puste' : ''
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Anuluj</Button>
                    <Button onClick={props.registerNewUser}>Utwórz konto</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default FacebookRegisterDialog