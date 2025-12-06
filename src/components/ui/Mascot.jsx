import React from 'react';
import Lottie from 'lottie-react';

// Import Lottie files directly to ensure they are bundled
// In a real app, you might dynamic import or use URLs, but importing is safest for Vite
import catAnimation from '../../assets/lotties/Central Icons Cat.json';
// For now, use idle for all emotions if others don't exist, or create them.
// I'll assume we only created idle.json for the demo.
// If the user provides others, we'd import them.

const animations = {
    idle: catAnimation,
    happy: catAnimation, // Placeholder until we have specific emotions
    sad: catAnimation,   // Placeholder
    thinking: catAnimation // Placeholder
};

const Mascot = ({ emotion = 'idle', width = 150, className, scale = 1.6 }) => {
    const animationData = animations[emotion] || animations.idle;

    return (
        <div
            className={className}
            style={{
                width: width,
                height: width,
                margin: '0 auto',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%', // Optional: make it circular if desired, but user didn't explicitly ask. Let's keep it simple or maybe just square.
                // User said "tampilih yg gerak2 aja di tengah", implies cropping whitespace.
            }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                transform: `scale(${scale})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default Mascot;
