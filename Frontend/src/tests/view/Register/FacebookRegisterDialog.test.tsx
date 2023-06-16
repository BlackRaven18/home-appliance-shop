import {render, fireEvent, screen} from '@testing-library/react';
import FacebookRegisterDialog from '../../../view/Register/FacebookRegisterDialog';

describe('FacebookRegisterDialog', () => {
    const defaultProps = {
        openDialog: true,
        handleCloseDialog: jest.fn(),
        onChangeForm: jest.fn(),
        handleAddressChange: jest.fn(),
        registerNewUser: jest.fn(),
        facebookFormData: {
            name: '',
            surname: '',
            email: '',
            password: '',
            phoneNumber: '',
            address: {
                state: '',
                city: '',
                street: '',
                postCode: '',
                apartment: '',
            },
        },
    };

    it('renders dialog with correct title', () => {
        render(<FacebookRegisterDialog {...defaultProps} />);
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('calls handleCloseDialog when "Anuluj" button is clicked', () => {
        render(<FacebookRegisterDialog {...defaultProps} />);
        const cancelButton = screen.getByText('Anuluj');
        fireEvent.click(cancelButton);
        expect(defaultProps.handleCloseDialog).toHaveBeenCalled();
    });

    it('calls handleErrors and registerNewUser when "Utwórz konto" button is clicked with valid form data', () => {
        render(<FacebookRegisterDialog {...defaultProps} />);
        const createAccountButton = screen.getByText('Utwórz konto');
        fireEvent.click(createAccountButton);
        expect(defaultProps.registerNewUser).toHaveBeenCalled();
    });

    it('displays error messages when form fields are empty', () => {
         render(
            <FacebookRegisterDialog
                {...defaultProps}
                facebookFormData={{
                    ...defaultProps.facebookFormData,
                    phoneNumber: '',
                    address: {
                        state: '',
                        city: '',
                        street: '',
                        postCode: '',
                        apartment: '',
                    },
                }}
            />
        );

        const createAccountButton = screen.getByText('Utwórz konto');
        fireEvent.click(createAccountButton);

        expect(screen.getByText('Pole Numer telefonu nie może być puste')).toBeInTheDocument();
        expect(screen.getByText('Pole Województwo nie może być puste')).toBeInTheDocument();
        expect(screen.getByText('Pole Miasto nie może być puste')).toBeInTheDocument();
        expect(screen.getByText('Pole Ulica nie może być puste')).toBeInTheDocument();
        expect(screen.getByText('Pole Kod pocztowy nie może być puste')).toBeInTheDocument();
        expect(screen.getByText('Pole Numer domu nie może być puste')).toBeInTheDocument();

        expect(defaultProps.registerNewUser).not.toHaveBeenCalled();
    });
});
