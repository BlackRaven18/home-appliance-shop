import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import ProfilList from '../../../view/Profil/ProfilList';
import UserDataManager from '../../../UserDataManager/UserDataManager';

jest.mock('axios');

describe('ProfilList', () => {
    beforeEach(() => {
        jest.spyOn(UserDataManager, 'getUserId').mockReturnValue('mockedUserId');
        jest.spyOn(UserDataManager, 'getUsername').mockReturnValue('mockedUsername');
        jest.spyOn(UserDataManager, 'getPassword').mockReturnValue('mockedPassword');
    });

    it('renders without errors', async () => {
        const mockPerson = {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '123456789',
            address: {
                state: 'State',
                city: 'City',
                street: 'Street',
                postCode: '12345',
            },
        };

        (axios.get as jest.Mock).mockResolvedValue({ data: mockPerson });

        render(<ProfilList />);

        await screen.findByText('John');
        expect(screen.getByAltText('')).toBeInTheDocument();
    });

    it('displays person information correctly when API call is successful', async () => {
        const mockedPerson = {
            name: 'Jan',
            surname: 'Kowalski',
            email: 'jan.kowalski@gmail.com',
            phoneNumber: '123456789',
            address: {
                state: 'Świętokrzyskie',
                city: 'Kielce',
                street: 'IX Wieków',
                postCode: '12345',
            },
        };

        axios.get = jest.fn().mockResolvedValueOnce({ data: mockedPerson });

        render(<ProfilList />);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            process.env.REACT_APP_BACKEND_URL + '/persons/mockedUserId',
            {
                auth: {
                    username: 'mockedUsername',
                    password: 'mockedPassword',
                },
            }
        );

        await screen.findByText('Jan');

        expect(screen.getByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jan.kowalski@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('123456789')).toBeInTheDocument();
        expect(screen.getByText('Świętokrzyskie')).toBeInTheDocument();
        expect(screen.getByText('Kielce')).toBeInTheDocument();
        expect(screen.getByText('IX Wieków')).toBeInTheDocument();
        expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('displays "unknown" when person information is not available', async () => {

        axios.get = jest.fn().mockRejectedValueOnce( new Error('API error') );

        render(<ProfilList />);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            process.env.REACT_APP_BACKEND_URL + '/persons/mockedUserId',
            {
                auth: {
                    username: 'mockedUsername',
                    password: 'mockedPassword',
                },
            }
        );

        await screen.findByText('Imię:');

        expect(screen.getByText('Imię:')).toBeInTheDocument();
        expect(screen.getByText('Nazwisko:')).toBeInTheDocument();
        expect(screen.getByText('Email:')).toBeInTheDocument();
        expect(screen.getByText('Numer telefonu:')).toBeInTheDocument();
        expect(screen.getByText('Województwo:')).toBeInTheDocument();
        expect(screen.getByText('Miasto:')).toBeInTheDocument();
        expect(screen.getByText('Ulica:')).toBeInTheDocument();
        expect(screen.getByText('Kod pocztowy:')).toBeInTheDocument();
    });
});
