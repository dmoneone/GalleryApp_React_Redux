import React from 'react'
import ModalImage from "react-modal-image";
import preloader from '../../../../assets/Preloader/5.gif'
const ModalImageContainer = props => {
    const { src, currentPicture } = props
    return (
        <>
            <ModalImage
                small={src}
                large={currentPicture ? currentPicture.full_picture : preloader}
                alt={currentPicture && (`${currentPicture.tags} \n ${currentPicture.author} \n ${currentPicture.camera}`) }
            />
        </>
    )
}

export default ModalImageContainer