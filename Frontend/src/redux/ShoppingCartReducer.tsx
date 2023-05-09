import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Product {
    productId: string;
    name: string;
    brand: string;
    color: string;
    specification: string;
    price: number;
    imageURL: string;
    category: {
        categoryId: string;
        name: string;
    };
}

export interface CartState {
    quantity: number,
    products: Product[]
 

}

const initialState: CartState = {
    quantity: 0,
    products:[],
    
}

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {

    addProductToCart: (state, action: PayloadAction<Product>) =>{
        state.products.push(action.payload);
    },

    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.quantity += 1
    },
    decrement: (state) => {
      state.quantity -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.quantity += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProductToCart, increment, decrement, incrementByAmount } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer