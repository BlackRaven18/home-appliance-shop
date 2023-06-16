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

    it('should display password validation error', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const passwordInput = screen.getByText('Password');
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

        await waitFor(() => {
            expect(screen.getByText('Pole Hasło nie może być puste')).toBeInTheDocument();
        });
    });



    it('should login user successfully', async () => {
        jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: 'user_id' });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByText('Adres email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/persons/login', {
                email: 'test@example.com',
                password: 'password123',
            });
        });

        expect(screen.getByText('Zalogowano pomyślnie')).toBeInTheDocument();
    });

    it('should display error message on login failure', async () => {
        jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Failed to login'));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByText('Adres email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: 'Zaloguj' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/persons/login', {
                email: 'test@example.com',
                password: 'password123',
            });
        });

        expect(screen.getByText('Wystąpił błąd podczas logowania')).toBeInTheDocument();
    });
});