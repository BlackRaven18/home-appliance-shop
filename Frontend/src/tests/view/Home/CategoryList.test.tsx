import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { categoriesSlice, setActiveCategory } from '../../../redux/CategoryReducer';
import CategoryList from '../../../view/Home/CategoryList';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

jest.mock('axios');

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
                </MemoryRouter >
            </Provider>
        );

        const categoryItems = await screen.findAllByRole('listitem');
        expect(categoryItems).toHaveLength(categoriesFromEndpoint.length);

        categoryItems.forEach((item, index) => {
            expect(item).toHaveTextContent(categoriesFromEndpoint[index].name);
        });
    });

    it('dispatches setActiveCategory on category click', async () => {
        const category = { categoryId: '1', name: 'Category 1' };
        const dispatchMock = jest.fn();
        const useDispatchMock = jest.spyOn(require('react-redux'), 'useDispatch');
        useDispatchMock.mockReturnValue(dispatchMock);
        (axios.get as jest.Mock).mockResolvedValue({ data: [category] });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryList />
                </MemoryRouter >
            </Provider>
        );

        const categoryItem = await screen.findByText(category.name);
        fireEvent.click(categoryItem);

        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledWith(setActiveCategory(category));
    });

    it('handles error on getCategories', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('Fetch error'));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CategoryList />
                </MemoryRouter >
            </Provider>
        );

        const categoryItems = await screen.findAllByRole('listitem');
        expect(categoryItems).toHaveLength(0);
    });
 });

describe('CategoryReducer', () => {
    it('should handle setActiveCategory', () => {
        const initialState = {
            categoryId: '',
            name: '',
        };
        const category = { categoryId: '1', name: 'Category 1' };

        const nextState = categoriesSlice.reducer(initialState, setActiveCategory(category));

        expect(nextState).toEqual(category);
    });
});
