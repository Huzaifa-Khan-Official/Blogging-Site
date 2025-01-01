// import React from 'react'

// const Modal = ({ className, children }) => {
//     return (
//         <div className={`absolute bg-white shadow-lg rounded-lg p-4 z-20 ${className}`}>
//             {children}
//         </div>
//     )
// }

// export default Modal

import React from 'react';

const Modal = ({ className, children, hasOverlay = false, onClose }) => {
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
            {/* Optional Overlay */}
            {hasOverlay && (
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={onClose}
                ></div>
            )}

            <div className={`absolute bg-white shadow-lg rounded-lg p-4 z-30 ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
