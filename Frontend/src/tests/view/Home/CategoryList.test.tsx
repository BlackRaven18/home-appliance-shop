import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../redux/store';
import CategoryList from '../../../view/Home/CategoryList';

jest.mock('axios');

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('CategoryList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders category list', async () => {
        const categoriesFromEndpoint = [
            { categoryId: '1', name: 'Category 1' },
            { categoryId: '2', name: 'Category 2' },
            { categoryId: '3', name: 'Category 3' },
        ];
        (axios.get as jest.Mock).mockResolvedValue({ data: categoriesFromEndpoint });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryList />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            const categoryItems = screen.getAllByRole('button');
            expect(categoryItems).toHaveLength(categoriesFromEndpoint.length);

            categoryItems.forEach((item, index) => {
                expect(item).toHaveTextContent(categoriesFromEndpoint[index].name);
            });
        });
    });

    it('handles error on getCategories', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('Fetch error'));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryList />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            const errorMessage = screen.getByText('Fetch error');
            expect(errorMessage).toBeInTheDocument();
        });
    });
});
