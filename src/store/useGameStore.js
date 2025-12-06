import { create } from 'zustand';
import { generateQuestion } from '../utils/mathHelpers';

const useGameStore = create((set, get) => ({
    score: 0,
    lives: 5,
    streak: 0,
    level: 1,
    currentQuestion: null,
    status: 'idle', // 'idle', 'playing', 'feedback'
    feedbackStatus: null, // 'correct', 'wrong'
    selectedAnswer: null,

    startGame: () => {
        const { level } = get();
        set({
            score: 0,
            lives: 5,
            streak: 0,
            status: 'playing',
            currentQuestion: generateQuestion(level),
            feedbackStatus: null,
            selectedAnswer: null
        });
    },

    submitAnswer: (answer) => {
        const { currentQuestion, score, streak, lives } = get();
        const isCorrect = answer === currentQuestion.answer;

        if (isCorrect) {
            set({
                score: score + 10 + (streak * 2), // Bonus for streak
                streak: streak + 1,
                status: 'feedback',
                feedbackStatus: 'correct',
                selectedAnswer: answer
            });
        } else {
            set({
                lives: Math.max(0, lives - 1),
                streak: 0,
                status: 'feedback',
                feedbackStatus: 'wrong',
                selectedAnswer: answer
            });
        }
    },

    nextQuestion: () => {
        const { level, lives } = get();
        if (lives <= 0) {
            // Game Over logic could go here, for now just restart or stay
            set({ status: 'idle' });
            return;
        }

        set({
            currentQuestion: generateQuestion(level),
            status: 'playing',
            feedbackStatus: null,
            selectedAnswer: null
        });
    }
}));

export default useGameStore;
