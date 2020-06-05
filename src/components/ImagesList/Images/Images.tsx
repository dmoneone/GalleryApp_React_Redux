import React, { FC, RefObject, useEffect, useState } from 'react'
import Picture from './Image/Image'
import { ImageType, GetImageRes } from './../../../API/api'
import c from './Images.module.scss'
import { isNumber } from 'util'

type OwnProps = {
    pictures: Array<ImageType>
    getCurrentPicture: (id: string, token: string) => void
    token: string
    currentPicture: GetImageRes
}

type Props = OwnProps

type Ref = string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined

const Images: FC<Props> = (props) => {
    const { pictures, getCurrentPicture, token, currentPicture } = props

    const imagesContainerRef: Ref = React.createRef()
    
    let [conatinerHeight, setConatinerHeight] = useState<number | undefined>(0)

    useEffect(() => {
        let tmp = imagesContainerRef.current?.offsetHeight
        if(isNumber(tmp) && tmp > 100) {
            setConatinerHeight(tmp)
        }
    })
    return (
        <div className={c['images-container']} ref={imagesContainerRef}
        style={{'height': ((isNumber(conatinerHeight) && conatinerHeight > 100) ? conatinerHeight : undefined) + 'px'}}>
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