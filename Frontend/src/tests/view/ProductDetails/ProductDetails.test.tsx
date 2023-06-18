import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import ProductDetails from '../../../view/ProductDetails/ProductDetails';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('react-router', () => ({
    useLocation: jest.fn(),
}));

describe('ProductDetails', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useLocation as jest.Mock).mockReturnValue({ state: {} });
    });

    it('renders product details', () => {
        const productDetails = {
            name: 'Test Product',
            brand: 'Test Brand',
            color: 'Test Color',
            specification: 'Test Specification',
            price: 9.99,
            imageURL: 'test-image-url',
        };

        (useLocation as jest.Mock).mockReturnValue({ state: productDetails });

        render(<ProductDetails />);

        expect(screen.getByText('Szczegóły produktu')).toBeInTheDocument();
        expect(screen.getByText('Nazwa:')).toBeInTheDocument();
        expect(screen.getByText('Marka:')).toBeInTheDocument();
        expect(screen.getByText('Kolor:')).toBeInTheDocument();
        expect(screen.getByText('Specyfikacja:')).toBeInTheDocument();
        expect(screen.getByText('Cena:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Dodaj do koszyka' })).toBeInTheDocument();
    });

    it('adds product to shopping cart on button click', () => {
        const productDetails = {
            name: 'Test Product',
            brand: 'Test Brand',
            color: 'Test Color',
            specification: 'Test Specification',
            price: 9.99,
            imageURL: 'test-image-url',
        };

        (useLocation as jest.Mock).mockReturnValue({ state: productDetails });

        render(<ProductDetails />);

        const addButton = screen.getByRole('button', { name: 'Dodaj do koszyka' });
        fireEvent.click(addButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'shoppingCart/addProductToCart',
            payload: productDetails,
        });
    });
});
