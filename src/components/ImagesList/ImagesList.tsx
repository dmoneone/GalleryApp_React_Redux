import React from 'react'
import { connect } from 'react-redux'
import { GlobalState } from '../../Redux/redux-store'
import { getPictures, setPage, getCurrentPicture } from './../../Redux/ImagesReducer'
import { ImageType, GetImageRes } from '../../API/api'
import Paginator from '../Paginator/Paginator'
import Images from './Images/Images'

type MapState = {
    token: string
    page: number
    pageCount: number
    pictures: Array<ImageType>
    countOfItemsOnPage: number
    currentPicture: GetImageRes
}

type MapDispatch = {
    getPictures: (page: number, token: string) => void
    setPage: (page: number) => void
    getCurrentPicture: (id: string, token: string) => void
}

type Props = MapState & MapDispatch

class ImagesList extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.getPictures(this.props.page, this.props.token)
    }
    loadPictures = (page: number) => {
        this.props.setPage(page)
        this.props.getPictures(page, this.props.token)
    }
    render() {
        return (
            <div>
               <Paginator
                    pageCount={this.props.pageCount}
                    page={this.props.page}
                    loadPictures={this.loadPictures}
                    countOfItemsOnPage={this.props.countOfItemsOnPage}
               />
               <Images
                    pictures={this.props.pictures}
                    getCurrentPicture={this.props.getCurrentPicture}
                    token={this.props.token}
                    currentPicture={this.props.currentPicture}
               />
            </div>
        )
    }
}

const MapStateToProps = (state: GlobalState): MapState => ({
    token: state.AuthReducer.token,
    page: state.ImagesReducer.page,
    pageCount: state.ImagesReducer.pageCount as number,
    pictures: state.ImagesReducer.pictures,
    countOfItemsOnPage: state.ImagesReducer.countOfItemsOnPage as number,
    currentPicture: state.ImagesReducer.currentPicture as GetImageRes
})

export default connect<MapState, MapDispatch, {}, GlobalState>(MapStateToProps, {getPictures, setPage, getCurrentPicture})(ImagesList)
