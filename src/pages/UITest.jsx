import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import FeedbackSheet from '@/components/ui/FeedbackSheet';
import GameLayout from '@/components/layout/GameLayout';

const UITest = () => {
    const [feedbackStatus, setFeedbackStatus] = useState(null); // 'correct', 'wrong', or null

    const handleCloseFeedback = () => {
        setFeedbackStatus(null);
    };

    return (
        <GameLayout
            progress={60}
            onClose={() => alert('Close clicked')}
            footer={
                <Button fullWidth variant="primary" onClick={() => setFeedbackStatus('correct')}>
                    Trigger Correct Feedback
                </Button>
            }
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <section>
                    <h3>Cards Grid</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Card>Normal</Card>
                        <Card selected>Selected</Card>
                        <Card status="correct">Correct</Card>
                        <Card status="wrong">Wrong</Card>
                    </div>
                </section>

                <section>
                    <h3>Buttons</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <Button variant="primary">Primary Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="danger">Danger Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="locked">Locked Button</Button>
                    </div>
                </section>

                <section>
                    <h3>Feedback Triggers</h3>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button size="sm" variant="danger" onClick={() => setFeedbackStatus('wrong')}>
                            Trigger Wrong
                        </Button>
                    </div>
                </section>
            </div>

            <FeedbackSheet
                status={feedbackStatus}
                correctAnswer="Jawaban Benar"
                onNext={handleCloseFeedback}
            />
        </GameLayout>
    );
};

export default UITest;
