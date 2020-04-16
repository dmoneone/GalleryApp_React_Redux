import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { Auth_API } from "../API/api"
import { GlobalState } from "./redux-store"

const initialState = {
    auth: false,
    token: ''
}
type State = typeof initialState

const USER_AUTH = 'gallery-app/AuthReducer/USER-AUTH'

type SetUserAuth = {
    type: typeof USER_AUTH
    auth: boolean
    token: string
}

type ActionTypes = SetUserAuth

const AuthReducer = (state: State = initialState, action: ActionTypes): State => {
    switch(action.type) {
        case USER_AUTH: {
            return {
                ...state,
                auth: action.auth,
                token: action.token
            }
        }
        default: return state
    }
}

export const setUserAuth = (auth: boolean, token: string): SetUserAuth => ({type: USER_AUTH, auth, token})

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getUserAuth = (): Thunk => async (dispatch) => {
    const data = await Auth_API.getAuth()
    dispatch(setUserAuth(data.auth, data.token))
}

export default AuthReducer