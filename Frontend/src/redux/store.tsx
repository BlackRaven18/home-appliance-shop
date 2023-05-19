import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoriesReducer from './CategoryReducer'
import shoppingCartReducer from './ShoppingCartReducer'

const persistConfiguration = {
    key: "root",
    version: 1,
    blacklist: ['categories'],
    storage
};

const reducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    categories: categoriesReducer,
})

const persistedReducer = persistReducer(persistConfiguration, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
