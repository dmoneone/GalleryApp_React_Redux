import { ImageType, Images_API, GetImageRes } from './../API/api'
import { ThunkAction } from 'redux-thunk'
import { GlobalState, ActionsTypes } from './redux-store'

const initialState = {
    pictures: [] as Array<ImageType>,
    page: 1,
    pageCount: null as number | null,
    countOfItemsOnPage: null as number | null,
    currentPicture: null as GetImageRes | null,
    isFetching: false   
}

type State = typeof initialState

type ActionTypes = ActionsTypes<typeof actions>

const ImagesReducer = (state: State = initialState, action: ActionTypes): State => {
    switch(action.type) {
        case 'gallery-app/ImagesReducer/SET-PICTURES': {
            return {
                ...state,
                pictures: action.pictures,
                pageCount: action.pageCout,
                countOfItemsOnPage: action.countOfItemsOnPage
            }
        }
        case 'gallery-app/ImagesReducer/SET-PAGE': {
            return {
                ...state,
                page: action.page
            }
        }
        case 'gallery-app/ImagesReducer/SET-CURRENT-PICTURE': {
            return {
                ...state,
                currentPicture: action.pictures
            }
        }
        case 'gallery-app/ImagesReducer/IS-FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default: return state
    }
}

export const actions = {
    setPictures : (pageCout: number, pictures: Array<ImageType>, countOfItemsOnPage: number) => ({
        type: 'gallery-app/ImagesReducer/SET-PICTURES',
        pageCout,
        pictures,
        countOfItemsOnPage
    } as const),
    setCurrentPicture : (pictures: GetImageRes) => ({
        type: 'gallery-app/ImagesReducer/SET-CURRENT-PICTURE',
        pictures
    } as const),
    setPage : (page: number) => ({
        type: 'gallery-app/ImagesReducer/SET-PAGE',
        page
    } as const),
    setFetching : (isFetching: boolean) => ({
        type: 'gallery-app/ImagesReducer/IS-FETCHING',
        isFetching
    } as const)
}

type Thunk =  ThunkAction<Promise<void>, GlobalState, unknown, ActionTypes>

export const getPictures = (page: number, token: string): Thunk => async (dispatch) => {
    dispatch(actions.setFetching(true))
    const data = await Images_API.getImages(page, token)
    dispatch(actions.setPictures(data.pageCount, data.pictures, data.pictures.length))  
    dispatch(actions.setFetching(false)) 
}

export const getCurrentPicture = (id: string, token: string): Thunk => async (dispatch) => {
    const data = await Images_API.getImage(id, token)
    dispatch(actions.setCurrentPicture(data))   
}

export default ImagesReducer