import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import configuration from '../configuration/config';

const authenticator = async () => {
    try {
        const response = await fetch(`${configuration.apiUrl}/posts/upload-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({ children, type, setProgress, setData }) => {
    const ref = useRef();

    const onError = (error) => {
        toast.error('Error uploading image!', {
            autoClose: 1000,
        });
    };

    const onSuccess = (res) => {
        setData(res);
        toast.success('Image uploaded successfully!', {
            autoClose: 1000,
        });
        setProgress(0);
    };

    const onUploadProgress = (progress) => {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
    }
    return (
        <IKContext
            publicKey={configuration.imageKitPublicKey}
            urlEndpoint={configuration.imageKitUrlEndPoint}
            authenticator={authenticator}
        >
            <IKUpload
                useUniqueFileName
                onError={onError}
                onSuccess={onSuccess}
                onUploadProgress={onUploadProgress}
                className='hidden'
                ref={ref}
                accept={`${type}/*`}
            />
            <div className='cursor-pointer' onClick={() => ref.current.click()}>
                {children}
            </div>
        </IKContext>
    )
}

export default Upload