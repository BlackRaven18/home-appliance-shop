import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ManageUsers from '../../../view/AdminHome/ManageUsers';
import React from 'react';

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

    it("allows modifying a user", async () => {
        const mockPersonId = "12345";
        const mockPeople = [
            {
                personId: mockPersonId,
                name: "Jan",
                surname: "Kowalski",
                email: "jankowalski@gmail.com",
                phoneNumber: "123456789",
                address: {
                    state: "Świętokrzyskie",
                    city: "Kielce",
                    street: "IX Wieków",
                    postCode: "12345",
                },
            },
        ];

        axios.get = jest.fn().mockResolvedValueOnce({ data: mockPeople });
        axios.put = jest.fn().mockResolvedValueOnce({});

        render(<ManageUsers />);

        await waitFor(() => {
            expect(screen.getByText("Jan")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("Modyfikuj"));

        const newFirstNameInput = screen.getByLabelText("Nowe imię");
        fireEvent.change(newFirstNameInput, { target: { value: "Anna" } });

        const newLastNameInput = screen.getByLabelText("Nowe nazwisko");
        fireEvent.change(newLastNameInput, { target: { value: "Kowalska" } });

        const newEmailInput = screen.getByLabelText("Nowy email");
        fireEvent.change(newEmailInput, { target: { value: "annakowalska@gmail.com" } });

        const newPhoneNumberInput = screen.getByLabelText("Nowy numer telefonu");
        fireEvent.change(newPhoneNumberInput, { target: { value: "987654321" } });

        const newStateInput = screen.getByLabelText("Nowe województwo");
        fireEvent.change(newStateInput, { target: { value: "Małopolskie" } });

        const newCityInput = screen.getByLabelText("Nowe miasto");
        fireEvent.change(newCityInput, { target: { value: "Kraków" } });

        const newStreetInput = screen.getByLabelText("Nowa ulica");
        fireEvent.change(newStreetInput, { target: { value: "Nowa" } });

        const newPostCodeInput = screen.getByLabelText("Nowy kod pocztowy");
        fireEvent.change(newPostCodeInput, { target: { value: "54321" } });

        fireEvent.click(screen.getByTestId("Zatwierdź"));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}/persons/${mockPersonId}`,
                {
                    name: "Anna",
                    surname: "Kowalska",
                    email: "annakowalska@gmail.com",
                    phoneNumber: "987654321",
                    address: {
                        state: "Małopolskie",
                        city: "Kraków",
                        street: "Nowa",
                        postCode: "54321",
                    },
                }
            );
        });
    });

    it('handles errors during user deletion', async () => {
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
        axios.delete = jest.fn().mockRejectedValueOnce(new Error('Failed to delete user'));

        render(<ManageUsers />);

        expect(await screen.findByText('Jan')).toBeInTheDocument();

        const deleteButton = screen.getByText('Usuń');
        fireEvent.click(deleteButton);

        await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
        expect(axios.delete).toHaveBeenCalledWith(process.env.REACT_APP_BACKEND_URL + '/persons/1');
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
