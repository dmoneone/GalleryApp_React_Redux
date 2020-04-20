import { ImageType, Images_API, GetImageRes } from './../API/api'
import { ThunkAction } from 'redux-thunk'
import { GlobalState } from './redux-store'

const initialState = {
    pictures: [] as Array<ImageType>,
    page: 1,
    pageCount: null as number | null,
    countOfItemsOnPage: null as number | null,
    currentPicture: null as GetImageRes | null
}

type State = typeof initialState

const SET_PICTURES = 'gallery-app/ImagesReducer/SET-PICTURES'
const SET_PAGE = 'gallery-app/ImagesReducer/SET-PAGE'
const SET_CURRENT_PICTURE = 'gallery-app/ImagesReducer/SET-CURRENT-PICTURE'

type SetPictures = {
    type: typeof SET_PICTURES
    pageCout: number
    pictures: Array<ImageType>
    countOfItemsOnPage: number
}

type SetCurrentPicture = {
    type: typeof SET_CURRENT_PICTURE
    pictures: GetImageRes
}

type SetPage = {
    type: typeof SET_PAGE,
    page: number
}

type ActionTypes = SetPictures | SetPage | SetCurrentPicture

const ImagesReducer = (state: State = initialState, action: ActionTypes): State => {
    switch(action.type) {
        case SET_PICTURES: {
            return {
                ...state,
                pictures: action.pictures,
                pageCount: action.pageCout,
                countOfItemsOnPage: action.countOfItemsOnPage
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case SET_CURRENT_PICTURE: {
            return {
                ...state,
                currentPicture: action.pictures
            }
        }
        default: return state
    }
}

const setPictures = (pageCout: number, pictures: Array<ImageType>, countOfItemsOnPage: number): SetPictures => ({
    type: SET_PICTURES,
    pageCout,
    pictures,
    countOfItemsOnPage
})

const setCurrentPicture = (pictures: GetImageRes): SetCurrentPicture => ({
    type: SET_CURRENT_PICTURE,
    pictures
})

export const setPage = (page: number): SetPage => ({
    type: SET_PAGE,
    page
})

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getPictures = (page: number, token: string): Thunk => async (dispatch) => {
    const data = await Images_API.getImages(page, token)
    dispatch(setPictures(data.pageCount, data.pictures, data.pictures.length))   
}

export const getCurrentPicture = (id: string, token: string): Thunk => async (dispatch) => {
    const data = await Images_API.getImage(id, token)
    dispatch(setCurrentPicture(data))   
}

export default ImagesReducer