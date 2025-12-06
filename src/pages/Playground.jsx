import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import FeedbackSheet from '@/components/ui/FeedbackSheet';
import Slider from '@/components/ui/Slider';
import Numpad from '@/components/ui/Numpad';
import LetterGrid from '@/components/ui/LetterGrid';
import Mascot from '@/components/ui/Mascot';

const Playground = () => {
    // State for interactive components
    const [selectedCard, setSelectedCard] = useState(null);
    const [sliderValue, setSliderValue] = useState(5);
    const [letterSliderValue, setLetterSliderValue] = useState(0);
    const [numpadOutput, setNumpadOutput] = useState('');
    const [letterOutput, setLetterOutput] = useState('');
    const [mascotEmotion, setMascotEmotion] = useState('idle');
    const [feedbackStatus, setFeedbackStatus] = useState(null);

    // Handlers
    const handleNumpadPress = (val) => {
        if (val === 'DEL') {
            setNumpadOutput((prev) => prev.slice(0, -1));
        } else {
            setNumpadOutput((prev) => prev + val);
        }
    };

    const handleCloseFeedback = () => {
        setFeedbackStatus(null);
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh' }}>
            <h1 style={{ color: 'var(--c-text)', marginBottom: '24px' }}>UI Design System v1.0</h1>

            {/* Progress Bar */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Progress Bar (70%)</h3>
                <div style={{ height: '24px' }}>
                    <ProgressBar progress={70} />
                </div>
            </section>

            {/* Buttons */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Buttons</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="ghost">Ghost</Button>
                </div>
            </section>

            {/* Cards */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Cards (Selectable)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {[1, 2, 3, 4].map((id) => (
                        <Card
                            key={id}
                            selected={selectedCard === id}
                            onClick={() => setSelectedCard(id)}
                        >
                            Card {id}
                        </Card>
                    ))}
                </div>
            </section>

            {/* Slider */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Interactive Slider</h3>

                {/* Number Slider */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '8px', fontWeight: 'bold', color: 'var(--c-text)' }}>
                        Number Value: {sliderValue}
                    </div>
                    <div style={{ padding: '0 20px' }}>
                        <Slider min={0} max={10} value={sliderValue} onChange={setSliderValue} />
                    </div>
                </div>

                {/* Letter Slider */}
                <div>
                    <div style={{ textAlign: 'center', marginBottom: '8px', fontWeight: 'bold', color: 'var(--c-text)' }}>
                        Letter Value: {['A', 'B', 'C', 'D', 'E'][letterSliderValue] || 'A'}
                    </div>
                    <div style={{ padding: '0 20px' }}>
                        <Slider
                            customLabels={['A', 'B', 'C', 'D', 'E']}
                            value={letterSliderValue}
                            onChange={setLetterSliderValue}
                        />
                    </div>
                </div>
            </section>

            {/* Numpad */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Interactive Numpad</h3>
                <div style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'var(--c-text)',
                    border: '2px solid var(--c-grey)',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {numpadOutput || <span style={{ color: 'var(--c-grey-dark)' }}>Type something...</span>}
                </div>
                <Numpad onPress={handleNumpadPress} />
            </section>

            {/* Letter Grid */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Letter Grid</h3>
                <div style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '12px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'var(--c-text)',
                    border: '2px solid var(--c-grey)',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {letterOutput || <span style={{ color: 'var(--c-grey-dark)' }}>Spell something...</span>}
                </div>
                <LetterGrid
                    chars={['M', 'O', 'R', 'O', 'K', 'I', 'D', 'S']}
                    onPress={(char) => setLetterOutput(prev => prev + char)}
                    onDelete={() => setLetterOutput(prev => prev.slice(0, -1))}
                />
            </section>

            {/* Mascot & Feedback */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Mascot & Feedback</h3>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                    <Mascot emotion={mascotEmotion} width={150} />
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', justifyContent: 'center' }}>
                    <Button size="sm" variant="outline" onClick={() => setMascotEmotion('idle')}>Idle</Button>
                    <Button size="sm" variant="outline" onClick={() => setMascotEmotion('happy')}>Happy</Button>
                    <Button size="sm" variant="outline" onClick={() => setMascotEmotion('sad')}>Sad</Button>
                    <Button size="sm" variant="outline" onClick={() => setMascotEmotion('thinking')}>Thinking</Button>
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <Button variant="primary" onClick={() => setFeedbackStatus('correct')} sound="correct">
                        Trigger Win
                    </Button>
                    <Button variant="danger" onClick={() => setFeedbackStatus('wrong')} sound="wrong">
                        Trigger Lose
                    </Button>
                </div>
            </section>

            {/* Feedback Sheet */}
            <FeedbackSheet
                status={feedbackStatus}
                correctAnswer="Jawaban Benar"
                onNext={handleCloseFeedback}
            />
        </div>
    );
};

export default Playground;
