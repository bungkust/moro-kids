import { useCallback, useState, useEffect } from 'react';
import useStore from '../store/useStore';

const useTTS = () => {
    const isSoundOn = useStore((state) => state.preferences.sound);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();

        // Chrome loads voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = useCallback((text, selectedVoice = null) => {
        if (!isSoundOn) return;
        if (!window.speechSynthesis) {
            console.warn('Web Speech API not supported in this browser.');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Use selected voice if provided, otherwise try to find Indonesian
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
            const indonesianVoice = voices.find(voice => voice.lang.includes('id-ID') || voice.lang.includes('ind'));
            if (indonesianVoice) {
                utterance.voice = indonesianVoice;
            }
        }

        // If no voice is set, it uses the browser default
        // We only force lang if we didn't manually select a voice (or if the selected voice matches the lang)
        // But generally, setting the voice object is enough.
        if (!selectedVoice) {
            utterance.lang = 'id-ID';
        }

        utterance.rate = 0.9;
        utterance.pitch = 1.1;

        window.speechSynthesis.speak(utterance);
    }, [isSoundOn, voices]);

    return { speak, voices };
};

export default useTTS;
