import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'; 
import AuthReducer from './AuthReducer'
import AppReducer from './AppReducer'
import ImagesReducer from './ImagesReducer'

const rootReducer = combineReducers({
    AuthReducer,
    AppReducer,
    ImagesReducer
})

type RootReducer = typeof rootReducer
export type GlobalState = ReturnType<RootReducer>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
//@ts-ignore
window.__store__ = store

export default store