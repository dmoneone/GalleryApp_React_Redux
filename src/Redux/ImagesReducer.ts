import { Image, Images_API } from './../API/api'
import { ThunkAction } from 'redux-thunk'
import { GlobalState } from './redux-store'

const initialState = {
    pictures: [] as Array<Image>,
    page: 1,
    pageCount: null as number | null
}

type State = typeof initialState

const SET_PICTURES = 'gallery-app/ImagesReducer/SET-PICTURES'
const SET_PAGE = 'gallery-app/ImagesReducer/SET-PAGE'

type SetPictures = {
    type: typeof SET_PICTURES
    pageCout: number
    pictures: Array<Image>
}

type SetPage = {
    type: typeof SET_PAGE,
    page: number
}

type ActionTypes = SetPictures | SetPage

const ImagesReducer = (state: State = initialState, action: ActionTypes): State => {
    switch(action.type) {
        case SET_PICTURES: {
            return {
                ...state,
                pictures: action.pictures,
                pageCount: action.pageCout
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        default: return state
    }
}

const setPictures = (pageCout: number, pictures: Array<Image>): SetPictures => ({
    type: SET_PICTURES,
    pageCout,
    pictures
})

export const setPage = (page: number): SetPage => ({
    type: SET_PAGE,
    page
})

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getPictures = (page: number, token: string): Thunk => async (dispatch) => {
    const data = await Images_API.getImages(page, token)
    dispatch(setPictures(data.pageCount, data.pictures))   
}

export default ImagesReducer