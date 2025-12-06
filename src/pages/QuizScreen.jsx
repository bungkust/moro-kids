import React, { useEffect } from 'react';
import useGameStore from '../store/useGameStore';
import GameLayout from '../components/layout/GameLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FeedbackSheet from '../components/ui/FeedbackSheet';

const QuizScreen = () => {
    const {
        score,
        lives,
        currentQuestion,
        status,
        feedbackStatus,
        selectedAnswer,
        startGame,
        submitAnswer,
        nextQuestion
    } = useGameStore();

    useEffect(() => {
        startGame();
    }, []);

    if (!currentQuestion) return <div>Loading...</div>;

    const handleAnswerClick = (answer) => {
        if (status === 'feedback') return; // Prevent clicking during feedback
        submitAnswer(answer);
    };

    return (
        <GameLayout
            progress={(score % 100)} // Dummy progress based on score for now
            onClose={() => alert('Exit Game?')}
            footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--c-text)' }}>
                        Lives: {lives} ❤️
                    </div>
                    <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                        Score: {score}
                    </div>
                </div>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center', marginTop: '20px' }}>
                <h1 style={{ fontSize: '48px', color: 'var(--c-text)', margin: 0 }}>
                    {currentQuestion.question}
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                    {currentQuestion.options.map((option) => {
                        let cardStatus = null;
                        if (status === 'feedback') {
                            if (option === currentQuestion.answer) cardStatus = 'correct';
                            else if (option === selectedAnswer) cardStatus = 'wrong';
                        }

                        return (
                            <Card
                                key={option}
                                onClick={() => handleAnswerClick(option)}
                                selected={selectedAnswer === option}
                                status={cardStatus}
                                style={{ fontSize: '24px' }}
                            >
                                {option}
                            </Card>
                        );
                    })}
                </div>
            </div>

            <FeedbackSheet
                status={feedbackStatus}
                correctAnswer={currentQuestion.answer}
                onNext={nextQuestion}
            />
        </GameLayout>
    );
};

export default QuizScreen;
