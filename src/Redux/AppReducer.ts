import { ThunkAction } from "redux-thunk"
import { GlobalState } from "./redux-store"
import { getUserAuth } from "./AuthReducer"

const initialState = {
    isInitialized: false
}

type State = typeof initialState

const GET_INITIALISATION = 'gallery-app/AppReducer/SET-INITIALISATION'

type SetInitialization = {
    type: typeof GET_INITIALISATION
    isInitialized: boolean
}

type ActionTypes = SetInitialization

const AppReducer = (state: State = initialState, action: ActionTypes): State => {
    switch(action.type) {
        case GET_INITIALISATION: {
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        }
        default: return state
    }
}

const setInitialization = (isInitialized: boolean): SetInitialization => {
    return {
        type: GET_INITIALISATION,
        isInitialized
    }
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getInitialization = (): Thunk => async (dispatch) => {
    const promise = dispatch(getUserAuth())
    await Promise.all([promise])
    dispatch(setInitialization(true))
}

export default AppReducer