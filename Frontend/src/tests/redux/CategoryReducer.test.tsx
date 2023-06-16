import { PayloadAction } from '@reduxjs/toolkit';
import categoriesReducer, { setActiveCategory, Category } from '../../redux/CategoryReducer';

describe('categoriesReducer', () => {
    it('should set active category', () => {
        const initialState: Category = {
            categoryId: '',
            name: '',
        };

        const category: Category = {
            categoryId: '1',
            name: 'Books',
        };

        const action: PayloadAction<Category> = {
            type: setActiveCategory.type,
            payload: category,
        };

        const newState = categoriesReducer(initialState, action);

        expect(newState.categoryId).toBe('1');
        expect(newState.name).toBe('Books');
    });

    it('should not modify state for unknown action type', () => {
        const initialState: Category = {
            categoryId: '1',
            name: 'Books',
        };

        const action: PayloadAction<Category> = {
            type: 'unknown_action',
            payload: {
                categoryId: '2',
                name: 'Electronics',
            },
        };

        const newState = categoriesReducer(initialState, action);

        expect(newState).toBe(initialState);
    });
});
