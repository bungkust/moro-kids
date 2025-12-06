import React, { useEffect } from 'react';
import Slider from '../ui/Slider';
import { useTranslation } from 'react-i18next';

const NumberLine = ({ question, onAnswer }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const questionText = currentLang === 'id' ? (question.text_id || question.text_en) : question.text_en;

    // Config from question or defaults
    const min = question.config?.min ?? 0;
    const max = question.config?.max ?? 10;
    const customLabels = question.config?.customLabels;

    // Default value logic (center of range)
    const defaultValue = Math.floor((min + max) / 2);

    // Initialize answer on mount if not set? 
    // The prompt says "Panggil onAnswer setiap kali slider berubah".
    // Usually we might want to set an initial value, but let's wait for user interaction or set it once.
    // Ideally, the parent controls the state, but here we just report changes.

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

            {/* Question Text */}
            <div style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '24px',
                border: '2px solid var(--c-grey)',
                width: '100%',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: 'var(--c-text)',
                    margin: 0
                }}>
                    {questionText}
                </h2>
            </div>

            {/* Slider */}
            <div style={{ width: '100%', padding: '0 16px' }}>
                <Slider
                    min={min}
                    max={max}
                    customLabels={customLabels}
                    defaultValue={defaultValue}
                    onChange={onAnswer}
                />
            </div>

        </div>
    );
};

export default NumberLine;
