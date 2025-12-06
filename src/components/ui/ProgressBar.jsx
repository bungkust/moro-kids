import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress = 0 }) => {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{ width: `${clampedProgress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
