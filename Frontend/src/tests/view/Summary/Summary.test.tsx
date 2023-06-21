import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Summary from '../../../view/Summary/Summary';

jest.mock('axios');

describe('Summary component', () => {
    let store: any;

    beforeEach(() => {
        store = createStore(() => ({
            shoppingCart: {
                cart: [
                    {
                        productDetails: {
                            productId: 1,
                            quantity: 2,
                            price: 10,
                            name: 'Product 1',
                            imageURL: 'image-url',
                        },
                    },
                    {
                        productDetails: {
                            productId: 2,
                            quantity: 1,
                            price: 20,
                            name: 'Product 2',
                            imageURL: 'image-url',
                        },
                    },
                ],
                productsNumber: 3,
                totalAmount: 40,
            },
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders product elements', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Summary />
                </Router>
            </Provider>
        );

        const productElement1 = screen.getByText(/Product 1/i);
        const productElement2 = screen.getByText(/Product 2/i);

        expect(productElement1).toBeInTheDocument();
        expect(productElement2).toBeInTheDocument();
    });

    test('renders correct products number', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Summary />
                </Router>
            </Provider>
        );

        const productsNumberElement = screen.getByText(/Liczba produktów: 3/i);

        expect(productsNumberElement).toBeInTheDocument();
    });

    test('renders correct total amount', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Summary />
                </Router>
            </Provider>
        );

        const totalAmountElement = screen.getByText(/Całkowity koszt: 40.00 zł/i);

        expect(totalAmountElement).toBeInTheDocument();
    });
});