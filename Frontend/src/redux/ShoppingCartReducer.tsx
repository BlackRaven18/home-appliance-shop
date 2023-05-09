import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
  quantity: number
}

const initialState: CartState = {
  quantity: 0,
}

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
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
export const { increment, decrement, incrementByAmount } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer