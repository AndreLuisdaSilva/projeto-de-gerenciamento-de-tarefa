import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const ButtonTask: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${className}`}
        >
            {children}
        </button>
    );
};

export default ButtonTask;
