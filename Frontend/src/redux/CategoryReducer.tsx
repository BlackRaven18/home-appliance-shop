import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Category {
    categoryId: string;
    name: string;
}


const initialState: Category = {
    categoryId: '',
    name: '',
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setActiveCategory: (state, action: PayloadAction<Category>) => {
            state.categoryId = action.payload.categoryId;
            state.name = action.payload.name;
        }


    }
})

export const { setActiveCategory } = categoriesSlice.actions

export default categoriesSlice.reducer;