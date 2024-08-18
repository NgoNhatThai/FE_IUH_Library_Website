import React from 'react';

const NotifyModal = ({ isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-4/5 max-w-md p-6 bg-white rounded-lg shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
                >
                    &times;
                </button>
                <p className="text-md font-semibold text-center text-gray-900">{title} !</p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="mt-4 px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotifyModal;
