import { PayloadAction } from '@reduxjs/toolkit';
import shoppingCartReducer, {
    addProductToCart,
    decrementAmountOfProduct,
    incrementAmountOfProduct,
    clearShoppingCart,
} from '../../redux/ShoppingCartReducer';
import ProductInterface from '../../view/shared/ProductInterface';

interface CartState {
    cart: {
        quantity: number;
        productDetails: ProductInterface;
    }[];
    totalAmount: number;
    productsNumber: number;
}

describe('shoppingCartReducer', () => {
    let initialState: CartState;

    beforeEach(() => {
        initialState = {
            cart: [],
            totalAmount: 0.0,
            productsNumber: 0,
        };
    });

    it('should add product to cart', () => {
        const product: ProductInterface = {
            productId: '1',
            name: 'Product 1',
            brand: 'Brand 1',
            color: 'Red',
            specification: 'Spec 1',
            price: 10.0,
            imageURL: 'image.jpg',
            category: {
                categoryId: '1',
                name: 'Category 1',
            },
        };

        const action: PayloadAction<ProductInterface> = {
            type: addProductToCart.type,
            payload: product,
        };

        const newState = shoppingCartReducer(initialState, action);

        expect(newState.cart.length).toBe(1);
        expect(newState.totalAmount).toBe(10.0);
        expect(newState.productsNumber).toBe(1);
        expect(newState.cart[0].quantity).toBe(1);
        expect(newState.cart[0].productDetails).toEqual(product);
    });

    it('should decrement amount of product in cart', () => {
        const product: ProductInterface = {
            productId: '1',
            name: 'Product 1',
            brand: 'Brand 1',
            color: 'Red',
            specification: 'Spec 1',
            price: 10.0,
            imageURL: 'image.jpg',
            category: {
                categoryId: '1',
                name: 'Category 1',
            },
        };

        const initialCartState: CartState = {
            cart: [{ quantity: 3, productDetails: product }],
            totalAmount: 30.0,
            productsNumber: 3,
        };

        const action: PayloadAction<ProductInterface> = {
            type: decrementAmountOfProduct.type,
            payload: product,
        };

        const newState = shoppingCartReducer(initialCartState, action);

        expect(newState.cart.length).toBe(1);
        expect(newState.totalAmount).toBe(20.0);
        expect(newState.productsNumber).toBe(2);
        expect(newState.cart[0].quantity).toBe(2);
        expect(newState.cart[0].productDetails).toEqual(product);
    });

    it('should increment amount of product in cart', () => {
        const product: ProductInterface = {
            productId: '1',
            name: 'Product 1',
            brand: 'Brand 1',
            color: 'Red',
            specification: 'Spec 1',
            price: 10.0,
            imageURL: 'image.jpg',
            category: {
                categoryId: '1',
                name: 'Category 1',
            },
        };

        const initialCartState: CartState = {
            cart: [{ quantity: 2, productDetails: product }],
            totalAmount: 20.0,
            productsNumber: 2,
        };

        const action: PayloadAction<ProductInterface> = {
            type: incrementAmountOfProduct.type,
            payload: product,
        };

        const newState = shoppingCartReducer(initialCartState, action);

        expect(newState.cart.length).toBe(1);
        expect(newState.totalAmount).toBe(30.0);
        expect(newState.productsNumber).toBe(3);
        expect(newState.cart[0].quantity).toBe(3);
        expect(newState.cart[0].productDetails).toEqual(product);
    });

    it('should clear shopping cart', () => {
        const initialCartState: CartState = {
            cart: [
                {
                    quantity: 2,
                    productDetails: {
                        productId: '1',
                        name: 'Product 1',
                        brand: 'Brand 1',
                        color: 'Red',
                        specification: 'Spec 1',
                        price: 10.0,
                        imageURL: 'image.jpg',
                        category: {
                            categoryId: '1',
                            name: 'Category 1',
                        },
                    },
                },
                {
                    quantity: 1,
                    productDetails: {
                        productId: '2',
                        name: 'Product 2',
                        brand: 'Brand 2',
                        color: 'Blue',
                        specification: 'Spec 2',
                        price: 20.0,
                        imageURL: 'image2.jpg',
                        category: {
                            categoryId: '2',
                            name: 'Category 2',
                        },
                    },
                },
            ],
            totalAmount: 40.0,
            productsNumber: 3,
        };

        const action: PayloadAction<{}> = {
            type: clearShoppingCart.type,
            payload: {},
        };

        const newState = shoppingCartReducer(initialCartState, action);

        expect(newState.cart.length).toBe(0);
        expect(newState.totalAmount).toBe(0.0);
        expect(newState.productsNumber).toBe(0);
    });

    it('should return the initial state when no action is dispatched', () => {
        const state = shoppingCartReducer(undefined, { type: '' });

        expect(state).toEqual(initialState);
    });

    it('should handle unknown actions correctly', () => {
        const state = shoppingCartReducer(initialState, { type: 'UNKNOWN_ACTION' });

        expect(state).toEqual(initialState);
    });
});
