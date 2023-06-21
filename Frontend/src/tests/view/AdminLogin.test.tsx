import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminLogin from '../../view/AdminLogin';

describe('AdminLogin', () => {
    it('renders login form', () => {
        render(
            <Router>
                <AdminLogin />
            </Router>
        );

        const emailInput = screen.getByText('Adres email');
        const passwordInput = screen.getByText('Password');
        const showPasswordCheckbox = screen.getByLabelText('Pokaż hasło');
        const loginButton = screen.getByRole('button', { name: 'Zaloguj się' });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(showPasswordCheckbox).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('displays error messages for empty fields', () => {
        render(
            <Router>
                <AdminLogin />
            </Router>
        );

        const loginButton = screen.getByRole('button', { name: 'Zaloguj się' });
        fireEvent.click(loginButton);

        const emailError = screen.getByText('Pole Email nie może być puste');
        const passwordError = screen.getByText('Pole Hasło nie może być puste');

        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });
});
