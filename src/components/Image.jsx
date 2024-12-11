import { IKImage } from 'imagekitio-react'
import React from 'react'
import configuration from '../configuration/config'

const Image = ({ src, className = "", w, h, alt }) => {
    return (
        <IKImage
            urlEndpoint={configuration.imageKitUrlEndPoint}
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