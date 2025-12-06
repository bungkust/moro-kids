import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import useSoundManager from '../../hooks/useSoundManager';

const EquationBuilder = ({ question, currentValue = [], onAnswer }) => {
    const { play } = useSoundManager();
    const [availableOptions, setAvailableOptions] = useState([]);

    // Initialize pool when question changes
    useEffect(() => {
        if (question && question.pool) {
            // Map pool strings to objects with unique IDs to handle duplicates
            const initialPool = question.pool.map((val, index) => ({
                id: `pool-${index}-${val}`,
                value: val
            }));
            setAvailableOptions(initialPool);
        }
    }, [question]);

    const handleSelect = (item) => {
        play('pop');

        // Remove from available options
        setAvailableOptions(prev => prev.filter(opt => opt.id !== item.id));

        // Add to answer (parent state)
        // We pass the string value
        onAnswer([...currentValue, item.value]);
    };

    const handleDeselect = (value, index) => {
        play('pop');

        // Remove from answer at specific index
        const newAnswer = [...currentValue];
        newAnswer.splice(index, 1);
        onAnswer(newAnswer);

        // Return to available options
        // We generate a new ID to ensure uniqueness
        setAvailableOptions(prev => [...prev, {
            id: `returned-${Date.now()}-${Math.random()}`,
            value: value
        }]);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Top Area: Answer Slot */}
            <div style={{
                minHeight: '80px',
                border: '3px dashed var(--c-grey)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F9FAFB',
                transition: 'all 0.2s'
            }}>
                {currentValue.length === 0 && (
                    <span style={{ color: 'var(--c-grey-dark)', fontStyle: 'italic', fontWeight: '600' }}>
                        Tap blocks to build answer
                    </span>
                )}
                {currentValue.map((val, index) => (
                    <Button
                        key={`ans-${index}`}
                        variant="primary"
                        onClick={() => handleDeselect(val, index)}
                        size="sm"
                        className="animate-pop" // Add pop animation class if available
                    >
                        {val}
                    </Button>
                ))}
            </div>

            {/* Bottom Area: Pool */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center'
            }}>
                {availableOptions.map((item) => (
                    <Button
                        key={item.id}
                        variant="outline"
                        onClick={() => handleSelect(item)}
                    >
                        {item.value}
                    </Button>
                ))}
            </div>

        </div>
    );
};

export default EquationBuilder;
