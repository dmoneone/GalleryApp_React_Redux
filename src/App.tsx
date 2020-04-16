import React from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import store, { GlobalState } from './Redux/redux-store';
import { getInitialization } from './Redux/AppReducer'
import Preloader from './components/Preloader/Preloader';
import ImagesList from './components/ImagesList/ImagesList'

type MapDispatch = {
    getInitialization: () => void
}

type MapState = {
    isInitialized: boolean
    token: string
}

type Props = MapDispatch & MapState

class App extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.getInitialization()
    }
    render() {
      if(!this.props.isInitialized) return <Preloader/>
      return (
        <div className="App">
            <ImagesList/>
        </div>
      )
    }
}

const MapStateToProps = (state: GlobalState): MapState => {
    return {
      isInitialized: state.AppReducer.isInitialized,
      token: state.AuthReducer.token
    }
}

const AppContainer = connect<MapState, MapDispatch, {}, GlobalState>(MapStateToProps, {getInitialization})(App)

const GalleryApp = () => {
    return (
      <Provider store={store}>
          <AppContainer/>
      </Provider>
    )
}

export default GalleryApp
