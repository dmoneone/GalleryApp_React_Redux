import React, { FC } from 'react'
import { Image } from '../../../API/api'

type OwnProps = {
    pictures: Array<Image>
}

type Props = OwnProps

const Images: FC<Props> = (props) => {
    const {pictures} = props
    return (
        <div>
            {
                pictures.map( (pic) => {
                    return <img key={Math.random()} src={pic.cropped_picture} />
                })
            }
        </div>
    )
}

export default Images