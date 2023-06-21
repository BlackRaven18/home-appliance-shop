import { configureStore} from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import categoriesReducer, { setActiveCategory } from '../../redux/CategoryReducer';
import shoppingCartReducer, {
    addProductToCart,
    decrementAmountOfProduct,
    incrementAmountOfProduct,
    clearShoppingCart,
} from '../../redux/ShoppingCartReducer';

const persistConfiguration = {
    key: 'root',
    version: 1,
    blacklist: ['categories'],
    storage,
};

const reducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    categories: categoriesReducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

describe('store', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: persistedReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                }),
        });
    });

    it('should dispatch setActiveCategory action correctly', () => {
        const category = {
            categoryId: '1',
            name: 'Category 1',
        };

        store.dispatch(setActiveCategory(category));

        const state = store.getState();

        expect(state.categories.categoryId).toBe(category.categoryId);
        expect(state.categories.name).toBe(category.name);
    });

    it('should dispatch addProductToCart action correctly', () => {
        const product = {
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

        store.dispatch(addProductToCart(product));

        const state = store.getState();

        expect(state.shoppingCart.cart.length).toBe(1);
        expect(state.shoppingCart.totalAmount).toBe(10.0);
        expect(state.shoppingCart.productsNumber).toBe(1);
        expect(state.shoppingCart.cart[0].quantity).toBe(1);
        expect(state.shoppingCart.cart[0].productDetails).toEqual(product);
    });

    it('should dispatch decrementAmountOfProduct action correctly', () => {
        const product = {
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

        store.dispatch(addProductToCart(product));
        store.dispatch(decrementAmountOfProduct(product));

        const state = store.getState();

        expect(state.shoppingCart.cart.length).toBe(0);
        expect(state.shoppingCart.totalAmount).toBe(0.0);
        expect(state.shoppingCart.productsNumber).toBe(0);
    });

    it('should dispatch incrementAmountOfProduct action correctly', () => {
        const product = {
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

        store.dispatch(addProductToCart(product));
        store.dispatch(incrementAmountOfProduct(product));

        const state = store.getState();

        expect(state.shoppingCart.cart.length).toBe(1);
        expect(state.shoppingCart.totalAmount).toBe(20.0);
        expect(state.shoppingCart.productsNumber).toBe(2);
        expect(state.shoppingCart.cart[0].quantity).toBe(2);
        expect(state.shoppingCart.cart[0].productDetails).toEqual(product);
    });

    it('should dispatch clearShoppingCart action correctly', () => {
        const product1 = {
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

        const product2 = {
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
        };

        store.dispatch(addProductToCart(product1));
        store.dispatch(addProductToCart(product2));
        store.dispatch(clearShoppingCart());

        const state = store.getState();

        expect(state.shoppingCart.cart.length).toBe(0);
        expect(state.shoppingCart.totalAmount).toBe(0.0);
        expect(state.shoppingCart.productsNumber).toBe(0);
    });
    it('should return the initial state when no action is dispatched', () => {
        const initialState = store.getState();

        expect(initialState.shoppingCart).toBeDefined();
        expect(initialState.categories).toBeDefined();
    });

    it('should handle unknown actions correctly', () => {
        store.dispatch({ type: 'UNKNOWN_ACTION' });

        const state = store.getState();

        expect(state).toEqual({
            shoppingCart: expect.any(Object),
            categories: expect.any(Object),
        });
    });
});