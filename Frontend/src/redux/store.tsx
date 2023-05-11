import {configureStore} from '@reduxjs/toolkit'
import shoppingCartReducer from './ShoppingCartReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfiguration = {
    key: "root",
    version: 1,
    storage
};

const reducer = combineReducers({
    shoppingCart: shoppingCartReducer,
})

const persistedReducer = persistReducer(persistConfiguration, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    // reducer:{
    //     shoppingCart: shoppingCartReducer,
    // }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
