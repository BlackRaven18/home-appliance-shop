import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ManagePayments from '../../../view/AdminHome/ManagePayments';

jest.mock('axios');

describe('ManagePayments', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and display users', async () => {
        const mockedResponse = [
            {
                personId: '1',
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                transactionsHistory: {
                    transactionId: '1',
                    transactions: [
                        {
                            transactionId: '1',
                            date: '2023-06-20',
                            status: 'pending',
                        },
                    ],
                },
            },
        ];

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
            data: mockedResponse,
        });

        render(<ManagePayments />);

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
        });

        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();

        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_URL}/persons`,
            {
                auth: {
                    username: expect.any(String),
                    password: expect.any(String),
                },
            }
        );
    });

    it('should filter users based on search term', async () => {
        const mockedResponse = [
            {
                personId: '1',
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                transactionsHistory: {
                    transactionId: '1',
                    transactions: [
                        {
                            transactionId: '1',
                            date: '2023-06-20',
                            status: 'pending',
                        },
                    ],
                },
            },
        ];

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
            data: mockedResponse,
        });

        render(<ManagePayments />);

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
        });

        const searchInput = screen.getByLabelText('Wyszukaj osobę');

        fireEvent.change(searchInput, { target: { value: 'John' } });

        await screen.findByText('Doe');

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();

        fireEvent.change(searchInput, { target: { value: 'Jane' } });

        await screen.findByText('Nie znaleziono osób spełniających kryteria wyszukiwania');

        expect(
            screen.getByText('Nie znaleziono osób spełniających kryteria wyszukiwania')
        ).toBeInTheDocument();
    });

    it('should toggle user expansion', async () => {
        const mockedResponse = [
            {
                personId: '1',
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
                transactionsHistory: {
                    transactionId: '1',
                    transactions: [
                        {
                            transactionId: '1',
                            date: '2023-06-20',
                            status: 'pending',
                        },
                    ],
                },
            },
        ];

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
            data: mockedResponse,
        });

        render(<ManagePayments />);

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Pokaż transakcje'));

        expect(screen.getByText('2023-06-20')).toBeInTheDocument();
        expect(screen.getByText('pending')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Ukryj transakcje'));

        await waitFor(() => {
            expect(screen.queryByText('Id: 1')).not.toBeInTheDocument();
        });

        expect(screen.queryByText('Data transakcji: 2023-06-20')).not.toBeInTheDocument();
        expect(screen.queryByText('Status transakcji: pending')).not.toBeInTheDocument();
    });

    // it('should handle accepting a transaction', async () => {
    //     const mockedResponse = [
    //         {
    //             personId: '1',
    //             name: 'John',
    //             surname: 'Doe',
    //             email: 'john.doe@example.com',
    //             phoneNumber: '1234567890',
    //             transactionsHistory: {
    //                 transactionId: '1',
    //                 transactions: [
    //                     {
    //                         transactionId: '1',
    //                         date: '2023-06-20',
    //                         status: 'failed',
    //                     },
    //                 ],
    //             },
    //         },
    //     ];
    //
    //     (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    //         data: mockedResponse,
    //     });
    //     (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({});
    //
    //     render(<ManagePayments />);
    //
    //     await waitFor(() => {
    //         expect(screen.getByText('John')).toBeInTheDocument();
    //     });
    //
    //     fireEvent.click(screen.getByTestId('Zatwierdź'));
    //
    //     await waitFor(() => {
    //         expect(axios.post).toHaveBeenCalledWith(
    //             `${process.env.REACT_APP_BACKEND_URL}/transactions/1/accept`,
    //             {},
    //             {
    //                 auth: {
    //                     username: expect.any(String),
    //                     password: expect.any(String),
    //                 },
    //             }
    //         );
    //     });
    //
    //     expect(screen.getByText('John')).toBeInTheDocument();
    //     expect(screen.getByText('Doe')).toBeInTheDocument();
    // });
});
