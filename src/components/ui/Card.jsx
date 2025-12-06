import React from 'react';
import clsx from 'clsx';
import './Card.css';

const Card = ({
    selected = false,
    status = null, // 'correct' | 'wrong' | null
    onClick,
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={clsx(
                'card',
                selected && 'card-selected',
                status === 'correct' && 'card-correct',
                status === 'wrong' && 'card-wrong',
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
