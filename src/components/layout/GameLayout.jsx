import React from 'react';
import { X } from '@phosphor-icons/react';
import ProgressBar from '../ui/ProgressBar';
import './GameLayout.css';

const GameLayout = ({
    progress,
    onClose,
    children,
    footer
}) => {
    return (
        <div className="game-layout">
            <header className="game-header">
                <button className="close-button" onClick={onClose} aria-label="Close">
                    <X size={24} weight="bold" />
                </button>
                <ProgressBar progress={progress} />
            </header>

            <main className="game-body">
                {children}
            </main>

            <footer className="game-footer">
                {footer}
            </footer>
        </div>
    );
};

export default GameLayout;
