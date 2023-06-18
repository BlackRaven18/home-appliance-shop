import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ManageUsers from '../../../view/AdminHome/ManageUsers';

jest.mock('axios');

describe('ManageUsers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays user information', async () => {
        const mockedData = [
            {
                personId: '1',
                name: 'Jan',
                surname: 'Kowalski',
                email: 'jankowalski@gmail.com',
                phoneNumber: '123456789',
                address: {
                    state: 'Świętokrzyskie',
                    city: 'Kielce',
                    street: 'IX Wieków',
                    postCode: '12345',
                },
            },
        ];

        axios.get = jest.fn().mockResolvedValueOnce({ data: mockedData });

        render(<ManageUsers />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();
        expect(screen.getByText('Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jankowalski@gmail.com')).toBeInTheDocument();
        expect(screen.getByText('123456789')).toBeInTheDocument();
        expect(screen.getByText('Świętokrzyskie')).toBeInTheDocument();
        expect(screen.getByText('Kielce')).toBeInTheDocument();
        expect(screen.getByText('IX Wieków')).toBeInTheDocument();
        expect(screen.getByText('12345')).toBeInTheDocument();
    });

    it('allows searching for a user', async () => {
        const mockedData = [
            {
                personId: '1',
                name: 'Jan',
                surname: 'Kowalski',
                email: 'jankowalski@gmail.com',
                phoneNumber: '123456789',
                address: {
                    state: 'Świętokrzyskie',
                    city: 'Kielce',
                    street: 'IX Wieków',
                    postCode: '12345',
                },
            },
            {
                personId: '2',
                name: 'Anna',
                surname: 'Nowak',
                email: 'annanowak@interia.com',
                phoneNumber: '987654321',
                address: {
                    state: 'Małopolskie',
                    city: 'Kraków',
                    street: 'Jana Pawła',
                    postCode: '54321',
                },
            },
        ];

        axios.get = jest.fn().mockResolvedValueOnce({ data: mockedData });

        render(<ManageUsers />);

        expect(await screen.findByText('Anna')).toBeInTheDocument();

        const searchInput = screen.getByLabelText('Wyszukaj osobę');
        fireEvent.change(searchInput, { target: { value: 'Anna' } });

        expect((searchInput as HTMLInputElement).value).toEqual('Anna');

        expect(screen.getByText('Anna')).toBeInTheDocument();
        expect(screen.getByText('Nowak')).toBeInTheDocument();
        expect(screen.getByText('annanowak@interia.com')).toBeInTheDocument();
        expect(screen.getByText('987654321')).toBeInTheDocument();
        expect(screen.getByText('Małopolskie')).toBeInTheDocument();
        expect(screen.getByText('Kraków')).toBeInTheDocument();
        expect(screen.getByText('Jana Pawła')).toBeInTheDocument();
        expect(screen.getByText('54321')).toBeInTheDocument();

        expect(screen.queryByText('Jan')).toBeNull();
        expect(screen.queryByText('Kowalski')).toBeNull();
        expect(screen.queryByText('jankowalski@gmail.com')).toBeNull();
        expect(screen.queryByText('123456789')).toBeNull();
        expect(screen.queryByText('Świętokrzyskie')).toBeNull();
        expect(screen.queryByText('Kielce')).toBeNull();
        expect(screen.queryByText('IX Wieków')).toBeNull();
        expect(screen.queryByText('12345')).toBeNull();
    });

    it('allows deleting a user', async () => {
        const mockedData = [
            {
                personId: '1',
                name: 'Jan',
                surname: 'Kowalski',
                email: 'jankowalski@gmail.com',
                phoneNumber: '123456789',
                address: {
                    state: 'Świętokrzyskie',
                    city: 'Kielce',
                    street: 'IX Wieków',
                    postCode: '12345',
                },
            },
        ];

        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockedData });
        jest.spyOn(axios, 'delete').mockImplementationOnce(() => Promise.resolve());

        render(<ManageUsers />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Usuń'));

        expect(axios.delete).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_URL}/persons/1`
        );

        await waitFor(() => {
            expect(screen.queryByText('Imię: Jan')).toBeNull();
        });
    });

    it('allows modifying a user', async () => {
        const mockedData = [
            {
                personId: '1',
                name: 'Jan',
                surname: 'Kowalski',
                email: 'jankowalski@gmail.com',
                phoneNumber: '123456789',
                address: {
                    state: 'Świętokrzyskie',
                    city: 'Kielce',
                    street: 'IX Wieków',
                    postCode: '12345',
                },
            },
        ];

        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockedData });
        jest.spyOn(axios, 'put').mockImplementationOnce(() => Promise.resolve());

        render(<ManageUsers />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Modyfikuj'));

        fireEvent.change(screen.getByLabelText('Nowe imię'), { target: { value: 'Anna' } });
        fireEvent.change(screen.getByLabelText('Nowe nazwisko'), { target: { value: 'Nowak' } });
        fireEvent.change(screen.getByLabelText('Nowy email'), { target: { value: 'annanowak@interia.com' } });
        fireEvent.change(screen.getByLabelText('Nowy numer telefonu'), { target: { value: '987654321' } });
        fireEvent.change(screen.getByLabelText('Nowe województwo'), { target: { value: 'Małopolskie' } });
        fireEvent.change(screen.getByLabelText('Nowe miasto'), { target: { value: 'Kraków' } });
        fireEvent.change(screen.getByLabelText('Nowa ulica'), { target: { value: 'Jana Pawła' } });
        fireEvent.change(screen.getByLabelText('Nowy kod pocztowy'), { target: { value: '54321' } });

        fireEvent.click(screen.getByText('Zatwierdź'));

        expect(axios.put).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_URL}/persons/1`,
            {
                name: 'Anna',
                surname: 'Nowak',
                email: 'annanowak@interia.com',
                phoneNumber: '987654321',
                address: {
                    state: 'Małopolskie',
                    city: 'Kraków',
                    street: 'Jana Pawła',
                    postCode: '54321',
                },
            }
        );

        await waitFor(() => expect(screen.queryByText('Jan')).toBeNull());
        expect(await screen.findByText('Anna')).toBeInTheDocument();
    });

    it('displays "Nie znaleziono osób spełniających kryteria wyszukiwania" when no matching people are found', async () => {
        const mockedData = [
            {
                personId: '1',
                name: 'Jan',
                surname: 'Kowalski',
                email: 'jankowalski@gmail.com',
                phoneNumber: '123456789',
                address: {
                    state: 'Świętokrzyskie',
                    city: 'Kielce',
                    street: 'IX Wieków',
                    postCode: '12345',
                },
            },
        ];

        axios.get = jest.fn().mockResolvedValueOnce({ data: mockedData });

        render(<ManageUsers />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Wyszukaj osobę'), { target: { value: 'Anna' } });

        expect(await screen.findByText('Nie znaleziono osób spełniających kryteria wyszukiwania')).toBeInTheDocument();

        expect(screen.queryByText('Jan')).toBeNull();
        expect(screen.queryByText('Kowalski')).toBeNull();
        expect(screen.queryByText('jankowalski@gmail.com')).toBeNull();
        expect(screen.queryByText('123456789')).toBeNull();
        expect(screen.queryByText('Świętokrzyskie')).toBeNull();
        expect(screen.queryByText('Kielce')).toBeNull();
        expect(screen.queryByText('IX Wieków')).toBeNull();
        expect(screen.queryByText('12345')).toBeNull();
    });
});
