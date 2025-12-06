import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import Button from './Button';
import './FeedbackSheet.css';

const FeedbackSheet = ({
    status, // 'correct' | 'wrong' | null
    correctAnswer,
    onNext
}) => {
    if (!status) return null;

    const isCorrect = status === 'correct';

    return (
        <div className="feedback-sheet-overlay">
            <AnimatePresence>
                <motion.div
                    className={`feedback-sheet ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="feedback-content">
                        <div className="feedback-header">
                            {isCorrect ? (
                                <CheckCircle size={32} weight="fill" color="var(--primary-dark)" />
                            ) : (
                                <XCircle size={32} weight="fill" color="var(--c-red)" />
                            )}
                            <h2 className="feedback-title">
                                {isCorrect ? 'Hebat!' : 'Yah, kurang tepat...'}
                            </h2>
                        </div>

                        {!isCorrect && correctAnswer && (
                            <p className="feedback-message">
                                Jawaban yang benar: {correctAnswer}
                            </p>
                        )}

                        <Button
                            variant={isCorrect ? 'primary' : 'danger'}
                            fullWidth
                            onClick={onNext}
                        >
                            Lanjut
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FeedbackSheet;
