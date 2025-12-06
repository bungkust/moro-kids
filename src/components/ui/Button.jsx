import React from 'react';
import clsx from 'clsx';
import { playSound } from '../../utils/sound';
import './Button.css';

const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon: Icon,
    children,
    className,
    disabled,
    onClick,
    sound = 'pop',
    ...props
}) => {

    const handleClick = (e) => {
        if (disabled) return;

        if (sound) {
            playSound(sound);
        }

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            className={clsx(
                'btn',
                `btn-${variant}`,
                `btn-${size}`,
                { 'btn-full': fullWidth },
                className
            )}
            disabled={disabled}
            onClick={handleClick}
            {...props}
        >
            {Icon && <Icon size={24} weight="bold" className="btn-icon" />}
            {children}
        </button>
    );
};

export default Button;
