import React from 'react';
import Numpad from '../ui/Numpad';
import { useTranslation } from 'react-i18next';

const NumericInput = ({ question, currentValue = '', onAnswer }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const questionText = currentLang === 'id' ? (question.text_id || question.text_en) : question.text_en;

    const handleNumpadPress = (val) => {
        if (val === 'DEL') {
            onAnswer(currentValue.slice(0, -1));
        } else {
            if (currentValue.length < 4) {
                onAnswer(currentValue + val);
            }
        }
    };

    // Replace '?' or placeholder with visual box
    const renderQuestionText = () => {
        const parts = questionText.split('?');
        if (parts.length === 1) return <span style={{ fontSize: '32px', fontWeight: '800' }}>{questionText}</span>;

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '32px', fontWeight: '800', color: 'var(--c-text)' }}>
                <span>{parts[0]}</span>
                <div style={{
                    minWidth: '80px',
                    height: '60px',
                    backgroundColor: 'white',
                    border: '3px solid var(--c-blue)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--c-blue)',
                    padding: '0 12px'
                }}>
                    {currentValue || '?'}
                </div>
                <span>{parts[1]}</span>
            </div>
        );
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

            {/* Question Display */}
            <div style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '24px',
                border: '2px solid var(--c-grey)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
                {renderQuestionText()}
            </div>

            {/* Numpad */}
            <div style={{ width: '100%', maxWidth: '360px' }}>
                <Numpad onPress={handleNumpadPress} />
            </div>
        </div>
    );
};

export default NumericInput;
