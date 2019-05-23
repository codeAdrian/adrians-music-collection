import React from 'react';

interface LoadingProps {
    className?: string;
}

const Loading = ({ className }: LoadingProps) => (
    <div className={`loading ${className ? className : ''}`}>
        <span className='loading__icon fas fa-compact-disc' />
    </div>
);

export { Loading };
