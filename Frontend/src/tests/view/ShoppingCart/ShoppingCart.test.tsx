import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { store } from '../../../redux/store';
import ShoppingCart from '../../../view/ShoppingCart/ShoppingCart';
import { addProductToCart, clearShoppingCart } from "../../../redux/ShoppingCartReducer";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe('ShoppingCart', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders ShoppingCart component', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const shoppingCartElement = screen.getByTestId('Koszyk');
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
            price: 10.00,
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

        expect(productName).toBeInTheDocument();
        expect(productBrand).toBeInTheDocument();
        expect(productColor).toBeInTheDocument();
        expect(productSpecification).toBeInTheDocument();
    });

    it('calls clearShoppingCart function when "Usuń zawartość koszyka" button is clicked', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <ShoppingCart />
                </MemoryRouter>
            </Provider>
        );

        const resetCartButton = screen.getByText(/Usuń zawartość koszyka/i);
        fireEvent.click(resetCartButton);
    });

    it('calls payForProducts function when "Zapłać" button is clicked', async () => {
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

        await waitFor(() => {
            expect(payButton).toBeVisible();
        });

        fireEvent.click(payButton);
    });
});
