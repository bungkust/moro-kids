import React from 'react';
import { X, Heart } from '@phosphor-icons/react';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import useStore from '../../store/useStore';

const GameHeader = ({ progress, onExit }) => {
    const hearts = useStore((state) => state.user?.hearts ?? 5);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            width: '100%',
            maxWidth: '600px', // Constrain width for better look on large screens
            margin: '0 auto'
        }}>
            {/* Close Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onExit}
                style={{ flexShrink: 0 }}
            >
                <X size={24} weight="bold" color="var(--c-grey-dark)" />
            </Button>

            {/* Progress Bar */}
            <div style={{ flex: 1 }}>
                <ProgressBar progress={progress} />
            </div>

            {/* Hearts Badge (Inline StatBadge) */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid var(--c-grey)',
                boxShadow: '0 4px 0 var(--c-grey-dark)',
                flexShrink: 0
            }}>
                <Heart size={24} weight="fill" color="#FF4D4D" />
                <span style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: 'var(--c-text)'
                }}>
                    {hearts}
                </span>
            </div>
        </div>
    );
};

export default GameHeader;
