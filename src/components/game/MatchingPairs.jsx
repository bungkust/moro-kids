import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import useSoundManager from '../../hooks/useSoundManager';

const MatchingPairs = ({ question, onAnswer }) => {
    const { play } = useSoundManager();
    const [cards, setCards] = useState([]);
    const [firstSelectedId, setFirstSelectedId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (question && question.items) {
            // If items are provided directly (flat list)
            // Expect items to have { id, content, pairId, image? }
            // We shuffle them here to ensure randomness
            const shuffled = [...question.items].sort(() => Math.random() - 0.5);
            setCards(shuffled.map(item => ({ ...item, status: 'idle' })));
        } else if (question && question.pairs) {
            // If pairs are provided, flatten them
            // question.pairs = [{ id: 'p1', items: [{content: 'A'}, {content: 'B'}] }]
            const flatList = [];
            question.pairs.forEach(pair => {
                pair.items.forEach((item, index) => {
                    flatList.push({
                        id: `${pair.id}-${index}`,
                        pairId: pair.id,
                        content: item.content,
                        image: item.image,
                        status: 'idle'
                    });
                });
            });
            const shuffled = flatList.sort(() => Math.random() - 0.5);
            setCards(shuffled);
        }
    }, [question]);

    const handleCardClick = (id) => {
        if (isProcessing) return;

        const clickedCard = cards.find(c => c.id === id);
        // Ignore if not found, already matched, or already selected (clicking same card twice)
        if (!clickedCard || clickedCard.status === 'matched' || clickedCard.status === 'selected') return;

        // 1. First Selection
        if (!firstSelectedId) {
            setFirstSelectedId(id);
            setCards(prev => prev.map(c => c.id === id ? { ...c, status: 'selected' } : c));
            play('pop');
            return;
        }

        // 2. Second Selection
        const firstCard = cards.find(c => c.id === firstSelectedId);

        // Check Match
        if (firstCard.pairId === clickedCard.pairId) {
            // MATCH!
            play('correct');
            const newCards = cards.map(c =>
                (c.id === id || c.id === firstSelectedId) ? { ...c, status: 'matched' } : c
            );
            setCards(newCards);
            setFirstSelectedId(null);

            // Check Win Condition
            if (newCards.every(c => c.status === 'matched')) {
                // Small delay before finishing to let the user see the match
                setTimeout(() => onAnswer(true), 500);
            }
        } else {
            // NO MATCH
            play('wrong');
            setIsProcessing(true);

            // Show error state
            setCards(prev => prev.map(c =>
                (c.id === id || c.id === firstSelectedId) ? { ...c, status: 'error' } : c
            ));

            // Reset after delay
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    (c.status === 'error') ? { ...c, status: 'idle' } : c
                ));
                setFirstSelectedId(null);
                setIsProcessing(false);
            }, 800);
        }
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto'
        }}>
            {cards.map(card => (
                <Card
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    selected={card.status === 'selected'}
                    status={
                        card.status === 'matched' ? 'correct' :
                            card.status === 'error' ? 'wrong' : null
                    }
                    style={{
                        minHeight: '100px',
                        fontSize: '24px',
                        opacity: card.status === 'matched' ? 0.5 : 1,
                        cursor: card.status === 'matched' ? 'default' : 'pointer'
                    }}
                >
                    {card.image ? (
                        <img
                            src={card.image}
                            alt="card"
                            style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                        />
                    ) : (
                        <span>{card.content}</span>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default MatchingPairs;
