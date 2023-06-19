import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../view/Login';

jest.mock('axios');

describe('Login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
        expect(screen.getByText('Adres email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Zaloguj' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Nie masz konta? Zarejestruj się!' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Wejdź jako niezalogowany' })).toBeInTheDocument();
    });

    it('should display email validation error', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

        await waitFor(() => {
            expect(screen.getByText('Pole Email nie może być puste')).toBeInTheDocument();
        });
    });

    it('navigates to registration page', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const registrationLink = screen.getByText('Nie masz konta? Zarejestruj się!');

        fireEvent.click(registrationLink);
    });

    it('navigates to home page as an unauthenticated user', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const unauthenticatedLink = screen.getByText('Wejdź jako niezalogowany');

        fireEvent.click(unauthenticatedLink);
    });
});