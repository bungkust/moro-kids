import React, { useState } from 'react';
import Card from '../ui/Card';
import useSoundManager from '../../hooks/useSoundManager';
import { useTranslation } from 'react-i18next';

const MultiSelect = ({ question, onAnswer }) => {
    const { play } = useSoundManager();
    const { i18n } = useTranslation();
    const [selectedIds, setSelectedIds] = useState([]);

    const currentLang = i18n.language;
    const questionText = currentLang === 'id' ? (question.text_id || question.text_en) : question.text_en;

    const handleToggle = (id) => {
        play('pop');
        let newSelection;
        if (selectedIds.includes(id)) {
            newSelection = selectedIds.filter(sid => sid !== id);
        } else {
            newSelection = [...selectedIds, id];
        }
        setSelectedIds(newSelection);
        onAnswer(newSelection);
    };

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

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%'
            }}>
                {question.options.map((option) => (
                    <Card
                        key={option.id}
                        selected={selectedIds.includes(option.id)}
                        onClick={() => handleToggle(option.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            gap: '8px',
                            minHeight: '120px'
                        }}
                    >
                        {option.image && (
                            <img
                                src={option.image}
                                alt={option.text}
                                style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                            />
                        )}
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{option.text}</span>
                    </Card>
                ))}
            </div>

            <p style={{ color: 'var(--c-grey-dark)', fontSize: '14px', fontStyle: 'italic' }}>
                Select all that apply
            </p>
        </div>
    );
};

export default MultiSelect;
