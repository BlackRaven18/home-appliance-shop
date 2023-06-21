import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductList from '../../../view/Product/ProductList';
import { store } from '../../../redux/store';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProducts = [
    {
        productId: '1',
        name: 'Product 1',
        brand: 'Brand 1',
        color: 'Color 1',
        specification: 'Spec 1',
        price: 10,
        imageURL: 'image1.jpg',
        category: {
            categoryId: '1',
            name: 'Category 1',
        },
    },
];

it('renders product list with search functionality', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProducts });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductList categoryId="1" />
            </MemoryRouter>
        </Provider>
    );

    const productListElements = await screen.findAllByTestId('product-list-element');
    expect(productListElements.length).toBe(mockProducts.length);

    const searchInput = screen.getByLabelText('Szukaj');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    const filteredProductListElements = await screen.findAllByTestId('product-list-element');
    expect(filteredProductListElements.length).toBe(1);
    expect(filteredProductListElements[0]).toHaveTextContent('Product 1');
});

it('fetches products on component mount', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockProducts });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductList categoryId="1" />
            </MemoryRouter>
        </Provider>
    );

    const productListElements = await screen.findAllByTestId('product-list-element');
    expect(productListElements.length).toBe(mockProducts.length);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});
