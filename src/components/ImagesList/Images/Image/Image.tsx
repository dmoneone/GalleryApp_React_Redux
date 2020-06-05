import React, { FC, useState, Component } from 'react'
import c from './Image.module.scss'
import { GetImageRes } from '../../../../API/api'
import ModalImage from './ModalImage'

type OwnProps = {
    src: string
    id: string
    token: string
    getCurrentPicture: (id: string, token: string) => void
    currentPicture: GetImageRes
}

type Props = OwnProps


const Picture: FC<Props> = React.memo(props => {
    const { src, id, token, getCurrentPicture, currentPicture } = props

    return (
        <div onClick={ () => getCurrentPicture(id, token) } className={c['img-wrap'] } >
            <ModalImage src={src} currentPicture={currentPicture}/>
        </div>
    )
})

export default Picture