import { Howl } from 'howler';

// Short "Pop" sound in base64 to ensure it works without external files
const POP_SOUND = 'data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
// Note: The above is a dummy empty/short string. 
// I will use a real very short beep/pop base64 if possible, or just a placeholder.
// Since I can't generate a real mp3 base64 easily, I will use a very short valid MP3 header/frame or just rely on the user providing the file?
// User said "Update Button.jsx... Import useSound (or wrapper Howler)".
// I'll try to load from assets, but fallback to nothing if missing.

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

export const playSound = (name) => {
    if (sounds[name]) {
        sounds[name].play();
    }
};
