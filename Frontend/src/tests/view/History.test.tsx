import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import History from '../../view/History';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import UserDataManager from '../../UserDataManager/UserDataManager';
import React from 'react';

jest.mock('axios');

describe('History', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: {} });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and display history correctly', async () => {
        const mockHistory = {
            transactionId: '123',
            transactions: [
                {
                    date: '2022-06-01',
                    status: 'Completed',
                    totalAmount: 100,
                    deliveryMethod: 'Express',
                    products: [
                        {
                            productId: '1',
                            price: 10,
                            quantity: 2,
                            name: 'Product 1',
                            imageURL: 'image1.jpg',
                        },
                        {
                            productId: '2',
                            price: 20,
                            quantity: 3,
                            name: 'Product 2',
                            imageURL: 'image2.jpg',
                        },
                    ],
                },
            ],
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockHistory });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <History />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Data: 2022-06-01')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Status: Completed')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Metoda dostawy: Express')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Kwota zamówienia: 100 zł')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Produkt Product 1')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Id produktu: 1')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Cena: 10 zł')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Ilosc: 2')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Obrazek: image1.jpg')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Produkt Product 2')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Id produktu: 2')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Cena: 20 zł')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Ilosc: 3')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Obrazek: image2.jpg')).toBeInTheDocument();
        });
    });

    it('handles error during fetching history', async () => {
        const errorMessage = 'Error fetching history';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <History />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(mockedAxios.get).toHaveBeenCalledWith(
                `${process.env.REACT_APP_BACKEND_URL}/persons/${UserDataManager.getUserId()}/transactions-history`,
                {
                    auth: {
                        username: UserDataManager.getUsername(),
                        password: UserDataManager.getPassword(),
                    },
                }
            );
        });

        expect(screen.queryByText('Data:')).toBeNull();
        expect(screen.queryByText('Status:')).toBeNull();
        expect(screen.queryByText('Metoda dostawy:')).toBeNull();
        expect(screen.queryByText('Kwota zamówienia:')).toBeNull();
        expect(screen.queryByText('Produkty w zamówieniu')).toBeNull();
    });
});