import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../../../view/Register/Register';
import {MemoryRouter} from "react-router-dom";

describe('Register', () => {
    it('renders register form', () => {
        render(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>
        );
        const registerForm = screen.getByRole('main');
        expect(registerForm).toBeInTheDocument();
    });

    it('displays error messages on form submit with empty fields', () => {
        render(
            <MemoryRouter>
             <Register/>
            </MemoryRouter>
        );
        const registerButton = screen.getByRole('button', { name: 'Zarejestruj się' });
        fireEvent.click(registerButton);

        const emailError = screen.getByText('Pole Email nie może być puste');
        expect(emailError).toBeInTheDocument();

        const passwordError = screen.getByText('Pole Hasło nie może być puste');
        expect(passwordError).toBeInTheDocument();

        const nameError = screen.getByText('Pole Imię nie może być puste');
        expect(nameError).toBeInTheDocument();

        const surnameError = screen.getByText('Pole Nazwisko nie może być puste');
        expect(surnameError).toBeInTheDocument();

        const phoneNumberError = screen.getByText('Pole Numer telefonu nie może być puste');
        expect(phoneNumberError).toBeInTheDocument();

        const stateError = screen.getByText('Pole Województwo nie może być puste');
        expect(stateError).toBeInTheDocument();

        const cityError = screen.getByText('Pole Miasto nie może być puste');
        expect(cityError).toBeInTheDocument();

        const streetError = screen.getByText('Pole Ulica nie może być puste');
        expect(streetError).toBeInTheDocument();

        const postCodeError = screen.getByText('Pole Kod pocztowy nie może być puste');
        expect(postCodeError).toBeInTheDocument();

        const apartmentError = screen.getByText('Pole Numer domu nie może być puste');
        expect(apartmentError).toBeInTheDocument();
    });
});
