import { IKImage } from 'imagekitio-react'
import React from 'react'

const Image = ({ src, className = "", w, h, alt }) => {
    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            path={src}
            alt={alt}
            className={className}
            width={w}
            height={h}
            loading='lazy'
            lqip={{ active: true, quality: 20 }}
        />
    )
}

export default Image