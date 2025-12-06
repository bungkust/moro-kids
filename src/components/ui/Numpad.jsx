import React from 'react';
import { Backspace } from '@phosphor-icons/react';
import Button from './Button';
import './Numpad.css';

const Numpad = ({ onPress }) => {
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handlePress = (value) => {
        if (onPress) {
            onPress(value);
        }
    };

    return (
        <div className="numpad-grid">
            {buttons.map((num) => (
                <Button
                    key={num}
                    variant="outline"
                    onClick={() => handlePress(num)}
                    className="numpad-btn"
                >
                    {num}
                </Button>
            ))}

            {/* Empty placeholder for alignment */}
            <div />

            <Button variant="outline" onClick={() => handlePress(0)}>
                0
            </Button>

            <Button variant="secondary" onClick={() => handlePress('DEL')}>
                <Backspace size={28} weight="bold" />
            </Button>
        </div>
    );
};

export default Numpad;
