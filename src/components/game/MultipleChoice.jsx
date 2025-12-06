import React from 'react';
import Card from '../ui/Card';
import { useTranslation } from 'react-i18next';

const MultipleChoice = ({ question, selectedAnswer, onAnswer }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    // Fallback to English if current language text is missing
    const questionText = currentLang === 'id' ? (question.text_id || question.text_en) : question.text_en;

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: 'var(--c-text)',
                textAlign: 'center',
                margin: 0
            }}>
                {questionText}
            </h2>

            {question.image && (
                <img
                    src={question.image}
                    alt="Question"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '16px',
                        border: '2px solid var(--c-grey)'
                    }}
                />
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%'
            }}>
                {question.options.map((option) => (
                    <Card
                        key={option.id}
                        selected={selectedAnswer === option.id}
                        onClick={() => onAnswer(option.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            gap: '8px'
                        }}
                    >
                        {option.image && (
                            <img
                                src={option.image}
                                alt={option.text}
                                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                            />
                        )}
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{option.text}</span>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MultipleChoice;
