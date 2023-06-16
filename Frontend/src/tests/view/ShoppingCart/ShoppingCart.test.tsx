import { render, screen, fireEvent } from '@testing-library/react';
import { store } from '../../../redux/store';
import ShoppingCart from '../../../view/ShoppingCart/ShoppingCart';
import { addProductToCart } from "../../../redux/ShoppingCartReducer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe('ShoppingCart', () => {
    it('renders ShoppingCart component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const shoppingCartElement = screen.getByText('Koszyk');
        expect(shoppingCartElement).toBeInTheDocument();
    });

    it('displays "Koszyk jest pusty" when cart is empty', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const emptyCartMessage = screen.getByText(/Koszyk jest pusty/i);
        expect(emptyCartMessage).toBeInTheDocument();
    });

    it('displays product details when cart is not empty', () => {
        const category = {
            categoryId: '1',
            name: 'Test category'
        }

        const testProduct = {
            productId: '1',
            name: 'Test Product',
            brand: 'Test Brand',
            color: 'Test Color',
            specification: 'Test Specification',
            price: 10.0,
            imageURL: 'test-image.jpg',
            category,
        };

        store.dispatch(addProductToCart(testProduct));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const productName = screen.getByText(/Test Product/i);
        const productBrand = screen.getByText(/Test Brand/i);
        const productColor = screen.getByText(/Test Color/i);
        const productSpecification = screen.getByText(/Test Specification/i);
        const productPrice = screen.getByText(/10.00/i);

        expect(productName).toBeInTheDocument();
        expect(productBrand).toBeInTheDocument();
        expect(productColor).toBeInTheDocument();
        expect(productSpecification).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });

    it('calls resetCart function when "Usuń zawartość koszyka" button is clicked', () => {
        const mockResetCart = jest.fn();
        jest.mock('../../../redux/ShoppingCartReducer', () => ({
            ...jest.requireActual('../../../redux/ShoppingCartReducer'),
            clearShoppingCart: () => ({
                type: 'mock/clearShoppingCart',
            }),
        }));
        const { clearShoppingCart } = require('../../../redux/ShoppingCartReducer');
        clearShoppingCart.mockImplementation(mockResetCart);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const resetCartButton = screen.getByText(/Usuń zawartość koszyka/i);
        fireEvent.click(resetCartButton);

        // Check if the resetCart function has been called
        expect(mockResetCart).toHaveBeenCalled();
    });

    it('calls payForProducts function when "Zapłać" button is clicked', () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router', () => ({
            ...jest.requireActual('react-router'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const payButton = screen.getByText(/Zapłać/i);
        fireEvent.click(payButton);

        expect(mockNavigate).toHaveBeenCalledWith('/summary');
    });
});