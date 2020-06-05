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

type PropsTypes<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropsTypes<T>>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
//@ts-ignore
window.__store__ = store

export default store