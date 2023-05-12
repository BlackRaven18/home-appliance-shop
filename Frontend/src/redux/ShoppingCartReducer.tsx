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

  totalAmount: number,
}


enum Operation {
  Increment,
  Decrement,
}

function updateTotalAmount(totalAmount: number, operation: Operation, price: number) {

  switch (operation) {
    case Operation.Increment:
      totalAmount += price;
      break;
    case Operation.Decrement:
      totalAmount -= price;
      break;
  }

  totalAmount = Number(totalAmount.toFixed(2));

  return totalAmount;
}



const initialState: CartState = {
  cart: [],
  totalAmount: 0.00,
}

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {

    addProductToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.productDetails.productId === action.payload.productId);

      if (itemInCart) {
        itemInCart.quantity++;
        state.totalAmount = updateTotalAmount(state.totalAmount, Operation.Increment, itemInCart.productDetails.price);
      } else {
        state.cart.push({ quantity: 1, productDetails: action.payload });
        state.totalAmount = updateTotalAmount(state.totalAmount, Operation.Increment, action.payload.price);
      }
    },

    decrementAmountOfProduct: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.productDetails.productId === action.payload.productId);

      if (!itemInCart) return;

      if (itemInCart.quantity === 1) {
        const productsArrayWithoutRemovedItem = state.cart.filter(
          (item) => item.productDetails.productId !== action.payload.productId)
        state.cart = productsArrayWithoutRemovedItem;

        if (state.cart.length > 0) {
          state.totalAmount = updateTotalAmount(state.totalAmount, Operation.Decrement, itemInCart.productDetails.price);
        } else {
          state.totalAmount = 0;
        }


      } else {
        itemInCart.quantity--;
        state.totalAmount = updateTotalAmount(state.totalAmount, Operation.Decrement, itemInCart.productDetails.price);
      }
    },

    incrementAmountOfProduct: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.productDetails.productId === action.payload.productId);

      if (itemInCart) {
        itemInCart.quantity++;
        state.totalAmount = updateTotalAmount(state.totalAmount, Operation.Increment, itemInCart.productDetails.price);
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProductToCart, decrementAmountOfProduct, incrementAmountOfProduct } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer