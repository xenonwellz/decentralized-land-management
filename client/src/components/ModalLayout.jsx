import React from 'react';

const ModalLayout = ({ children }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full p-16 bg-black/70'>
            <div className="max-w-2xl mx-auto bg-white rounded-lg">
                {children}
            </div>
        </div>
    );
}

export default ModalLayout;
