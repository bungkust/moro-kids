import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import useTTS from '../hooks/useTTS';
import useSoundManager from '../hooks/useSoundManager';
import { logProgress } from '../db/repositories';

// Components
import GameLayout from '../components/layout/GameLayout';
import GameHeader from '../components/game/GameHeader';
import FeedbackSheet from '../components/ui/FeedbackSheet';
import Button from '../components/ui/Button';

// Renderers
import MultipleChoice from '../components/game/MultipleChoice';
import NumericInput from '../components/game/NumericInput';
import EquationBuilder from '../components/game/EquationBuilder';
import NumberLine from '../components/game/NumberLine';
import MatchingPairs from '../components/game/MatchingPairs';
import MultiSelect from '../components/game/MultiSelect';

// Dummy Data (For Phase 3 Testing)
const DUMMY_QUESTIONS = [
    {
        id: 'q1',
        type: 'multiple_choice',
        text_en: 'Which fruit is red?',
        text_id: 'Buah mana yang berwarna merah?',
        options: [
            { id: 'opt1', text: 'Banana', image: null },
            { id: 'opt2', text: 'Apple', image: null },
            { id: 'opt3', text: 'Grape', image: null },
            { id: 'opt4', text: 'Lemon', image: null },
        ],
        correctAnswer: 'opt2',
        xp: 10
    },
    {
        id: 'q2',
        type: 'numeric',
        text_en: '5 + 3 = ?',
        text_id: '5 + 3 = ?',
        correctAnswer: '8',
        xp: 15
    },
    {
        id: 'q3',
        type: 'builder',
        text_en: 'Spell the word: BOOK',
        text_id: 'Susun kata: BUKU',
        pool: ['K', 'U', 'B', 'A', 'U', 'M'],
        correctAnswer: ['B', 'U', 'K', 'U'], // Array comparison needed
        xp: 20
    },
    {
        id: 'q4',
        type: 'number_line',
        text_en: 'Find number 7',
        text_id: 'Cari angka 7',
        config: { min: 0, max: 10 },
        correctAnswer: 7,
        xp: 15
    },
    {
        id: 'q5',
        type: 'matching',
        text_en: 'Match the pairs',
        text_id: 'Cocokkan pasangan',
        pairs: [
            { id: 'p1', items: [{ content: 'A' }, { content: 'Apple' }] },
            { id: 'p2', items: [{ content: 'B' }, { content: 'Banana' }] }
        ],
        correctAnswer: true, // Matching component handles validation internally
        xp: 25
    },
    {
        id: 'q6',
        type: 'multi_select',
        text_en: 'Select all odd numbers',
        text_id: 'Pilih semua angka ganjil',
        options: [
            { id: '1', text: '1' },
            { id: '2', text: '2' },
            { id: '3', text: '3' },
            { id: '4', text: '4' }
        ],
        correctAnswer: ['1', '3'],
        xp: 20
    }
];

const GameScreen = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { user, updateStats } = useStore();
    const { speak } = useTTS();
    const { play } = useSoundManager();

    // Game State
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'wrong'
    const [isLoading, setIsLoading] = useState(true);

    // Load Questions on Mount
    useEffect(() => {
        // Simulate loading delay or fetch logic
        setTimeout(() => {
            setQuestions(DUMMY_QUESTIONS);
            setIsLoading(false);
        }, 500);
    }, []);

    // Speak question when it changes
    useEffect(() => {
        if (questions.length > 0 && status === 'idle') {
            const currentQ = questions[currentIndex];
            const text = i18n.language === 'id' ? (currentQ.text_id || currentQ.text_en) : currentQ.text_en;
            speak(text);
        }
    }, [currentIndex, questions, status, i18n.language, speak]);

    const handleAnswerChange = (val) => {
        if (status !== 'idle') return; // Prevent changing answer after submission
        setUserAnswer(val);

        // Auto-submit for matching game when completed
        if (questions[currentIndex].type === 'matching' && val === true) {
            // We need to trigger check, but handleCheck uses state userAnswer which might not be updated yet in this closure
            // So we pass the value directly or use a timeout. 
            // Better: set answer then call check logic.
            // For matching, val is true.
            handleCheck(true);
        }
    };

    const handleCheck = async (directAnswer = null) => {
        const currentQ = questions[currentIndex];
        const answerToCheck = directAnswer !== null ? directAnswer : userAnswer;

        let isCorrect = false;

        // Validation Logic
        if (currentQ.type === 'builder') {
            const correctArr = currentQ.correctAnswer;
            isCorrect = Array.isArray(answerToCheck) &&
                answerToCheck.length === correctArr.length &&
                answerToCheck.every((val, index) => val === correctArr[index]);
        } else if (currentQ.type === 'multi_select') {
            const correctArr = currentQ.correctAnswer;
            // Sort both arrays to ensure order doesn't matter
            const sortedUser = [...(answerToCheck || [])].sort();
            const sortedCorrect = [...correctArr].sort();
            isCorrect = sortedUser.length === sortedCorrect.length &&
                sortedUser.every((val, index) => val === sortedCorrect[index]);
        } else if (currentQ.type === 'matching') {
            isCorrect = answerToCheck === true;
        } else {
            // String/Number comparison
            isCorrect = String(answerToCheck) === String(currentQ.correctAnswer);
        }

        if (isCorrect) {
            setStatus('correct');
            play('correct');
            // Update XP
            if (user) {
                await updateStats({ xp: (user.xp || 0) + currentQ.xp });
            }
            // Log to DB
            if (user) {
                logProgress({
                    user_id: user.id,
                    question_id: currentQ.id,
                    type: currentQ.type,
                    is_correct: true,
                    score_gained: currentQ.xp
                });
            }
        } else {
            setStatus('wrong');
            play('wrong');
            // Decrease Hearts
            if (user) {
                const newHearts = Math.max(0, (user.hearts || 5) - 1);
                await updateStats({ hearts: newHearts });
            }
            // Log to DB
            if (user) {
                logProgress({
                    user_id: user.id,
                    question_id: currentQ.id,
                    type: currentQ.type,
                    is_correct: false,
                    score_gained: 0
                });
            }
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer(null);
            setStatus('idle');
        } else {
            // Game Over / Result
            navigate('/dashboard'); // Temporary redirect
        }
    };

    const handleExit = () => {
        if (window.confirm(t('Are you sure you want to quit?'))) {
            navigate('/dashboard');
        }
    };

    const renderContent = () => {
        const currentQ = questions[currentIndex];
        switch (currentQ.type) {
            case 'multiple_choice':
                return <MultipleChoice question={currentQ} selectedAnswer={userAnswer} onAnswer={handleAnswerChange} />;
            case 'numeric':
                return <NumericInput question={currentQ} currentValue={userAnswer} onAnswer={handleAnswerChange} />;
            case 'builder':
                return <EquationBuilder question={currentQ} currentValue={userAnswer || []} onAnswer={handleAnswerChange} />;
            case 'number_line':
                return <NumberLine question={currentQ} onAnswer={handleAnswerChange} />;
            case 'matching':
                return <MatchingPairs question={currentQ} onAnswer={handleAnswerChange} />;
            case 'multi_select':
                return <MultiSelect question={currentQ} onAnswer={handleAnswerChange} />;
            default:
                return <div>Unknown Question Type</div>;
        }
    };

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    const currentQ = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    return (
        <GameLayout
            progress={progress}
            onClose={handleExit}
            footer={
                <div style={{ padding: '16px', background: 'white', borderTop: '2px solid var(--c-grey)' }}>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleCheck()}
                        disabled={
                            (!userAnswer && currentQ.type !== 'matching') ||
                            status !== 'idle' ||
                            (currentQ.type === 'matching') // Matching auto-submits
                        }
                        style={{ opacity: currentQ.type === 'matching' ? 0 : 1 }} // Hide button for matching
                    >
                        {t('CHECK ANSWER')}
                    </Button>
                </div>
            }
        >
            {/* Custom Header with Stats */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}>
                <GameHeader progress={progress} onExit={handleExit} />
            </div>

            <div style={{
                padding: '80px 20px 120px 20px', // Add padding for header and footer
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {renderContent()}
            </div>

            {/* Feedback Sheet */}
            <FeedbackSheet
                isOpen={status !== 'idle'}
                status={status}
                correctAnswer={
                    Array.isArray(currentQ.correctAnswer)
                        ? currentQ.correctAnswer.join('')
                        : currentQ.correctAnswer
                }
                onNext={handleNext}
            />
        </GameLayout>
    );
};

export default GameScreen;
