import React, { FC } from 'react'
import Picture from './Image/Image'
import { ImageType, GetImageRes } from './../../../API/api'

type OwnProps = {
    pictures: Array<ImageType>
    getCurrentPicture: (id: string, token: string) => void
    token: string
    currentPicture: GetImageRes
}

type Props = OwnProps

const Images: FC<Props> = (props) => {
    const { pictures, getCurrentPicture, token, currentPicture } = props
    return (
        <div>
            {
                pictures.map( (pic) => {
                    return <Picture 
                        key={pic.id}
                        src={pic.cropped_picture}
                        id={pic.id}
                        token={token}
                        getCurrentPicture={getCurrentPicture}
                        currentPicture={currentPicture}
                    />
                })
            }
        </div>
    )
}

export default Images