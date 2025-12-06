import React from 'react';
import { Backspace } from '@phosphor-icons/react';
import Button from './Button';

const LetterGrid = ({ chars = [], onPress, onDelete }) => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '400px', // Prevent it from getting too wide on desktop
            margin: '0 auto'
        }}>
            {chars.map((char, index) => (
                <Button
                    key={`${char}-${index}`} // Use index to allow duplicate chars
                    variant="outline"
                    onClick={() => onPress && onPress(char)}
                    style={{ minWidth: '60px', fontSize: '24px', padding: '0 16px' }}
                >
                    {char}
                </Button>
            ))}

            {/* Delete Button */}
            <Button
                variant="danger"
                onClick={onDelete}
                style={{ minWidth: '60px' }}
            >
                <Backspace size={28} weight="bold" />
            </Button>
        </div>
    );
};

export default LetterGrid;
