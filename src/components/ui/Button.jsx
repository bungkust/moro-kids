import React from 'react';
import clsx from 'clsx';
import './Button.css';

const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    children,
    className,
    disabled,
    onClick,
    ...props
}) => {
    const isLocked = variant === 'locked';

    return (
        <button
            className={clsx(
                'btn',
                `btn-${variant}`,
                `btn-${size}`,
                fullWidth && 'btn-full',
                className
            )}
            disabled={disabled || isLocked}
            onClick={onClick}
            {...props}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
