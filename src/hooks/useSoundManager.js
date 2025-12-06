import { useCallback } from 'react';
import { Howl } from 'howler';
import useStore from '../store/useStore';

// Initialize sounds outside the hook to avoid recreating them on every render
const sounds = {
    pop: new Howl({
        src: ['/src/assets/sounds/Pop.mp3'],
        html5: true,
        volume: 0.5
    }),
    correct: new Howl({
        src: ['/src/assets/sounds/correct.mp3'],
        html5: true,
        volume: 0.6
    }),
    wrong: new Howl({
        src: ['/src/assets/sounds/Wrong.mp3'],
        html5: true,
        volume: 0.5
    }),
    win: new Howl({
        src: ['/src/assets/sounds/Win.mp3'],
        html5: true,
        volume: 0.7
    })
};

const useSoundManager = () => {
    const isSoundOn = useStore((state) => state.preferences.sound);

    const play = useCallback((soundName) => {
        if (!isSoundOn) return;

        const sound = sounds[soundName];
        if (sound) {
            sound.play();
        } else {
            console.warn(`Sound "${soundName}" not found.`);
        }
    }, [isSoundOn]);

    return { play };
};

export default useSoundManager;
