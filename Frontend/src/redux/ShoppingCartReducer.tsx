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


interface CartState {
  cart: {
    quantity: number,
    productDetails: Product
  }[]
}


const initialState: CartState = {
  cart: []
}


export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {

    addProductToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.productDetails.productId == action.payload.productId);

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ quantity: 1, productDetails: action.payload });
      }
    },

    decrementAmountOfProduct: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.productDetails.productId == action.payload.productId);

      if (itemInCart) {
        if (itemInCart.quantity == 1) {
          const productsArrayWithoutRemovedItem = state.cart.filter(
            (item) => item.productDetails.productId !== action.payload.productId)

          state.cart = productsArrayWithoutRemovedItem;
        } else {
          itemInCart.quantity--;
        }
      }
    },

    incrementAmountOfProduct: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.productDetails.productId == action.payload.productId);

      if (itemInCart) {
        itemInCart.quantity++;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProductToCart, decrementAmountOfProduct, incrementAmountOfProduct } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer