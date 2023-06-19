import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../../redux/ShoppingCartReducer';
import ProductDetails from '../../../view/ProductDetails/ProductDetails';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('../../../redux/ShoppingCartReducer', () => ({
    addProductToCart: jest.fn(),
}));

describe('ProductDetails', () => {
    beforeEach(() => {
        (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders product details', () => {
        const state = {
            productId: '1',
            name: 'Product 1',
            brand: 'Brand 1',
            color: 'Red',
            specification: 'Specification 1',
            price: 10.99,
            imageURL: 'image.jpg',
            category: {
                categoryId: '1',
                name: 'Category 1',
            },
        };

        render(
            <MemoryRouter initialEntries={[{ state }]}>
                <ProductDetails />
            </MemoryRouter>
        );

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Brand 1')).toBeInTheDocument();
        expect(screen.getByText('Red')).toBeInTheDocument();
        expect(screen.getByText('Specification 1')).toBeInTheDocument();
        expect(screen.getByText('10,99 zł')).toBeInTheDocument();
    });
});