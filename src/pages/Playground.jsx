import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import FeedbackSheet from '@/components/ui/FeedbackSheet';
import Slider from '@/components/ui/Slider';
import Numpad from '@/components/ui/Numpad';
import LetterGrid from '@/components/ui/LetterGrid';
import Mascot from '@/components/ui/Mascot';

import useStore from '@/store/useStore';
import useTTS from '@/hooks/useTTS';
import useSoundManager from '@/hooks/useSoundManager';
import Select from '@/components/ui/Select';
import MultipleChoice from '@/components/game/MultipleChoice';
import NumericInput from '@/components/game/NumericInput';
import EquationBuilder from '@/components/game/EquationBuilder';
import MatchingPairs from '@/components/game/MatchingPairs';

const Playground = () => {
    // Global State
    const { preferences, toggleSound, toggleMusic } = useStore();
    const { speak, voices } = useTTS();
    const { play } = useSoundManager(); // Import play directly

    // State for interactive components
    const [selectedCard, setSelectedCard] = useState(null);
    const [sliderValue, setSliderValue] = useState(5);
    const [letterSliderValue, setLetterSliderValue] = useState(0);
    const [numpadOutput, setNumpadOutput] = useState('');
    const [letterOutput, setLetterOutput] = useState('');
    const [mascotEmotion, setMascotEmotion] = useState('idle');
    const [feedbackStatus, setFeedbackStatus] = useState(null);
    const [ttsInput, setTtsInput] = useState('Halo, aku Moro!');
    const [selectedVoiceName, setSelectedVoiceName] = useState('');

    // Game Component States
    const [mcAnswer, setMcAnswer] = useState(null);
    const [numAnswer, setNumAnswer] = useState('');
    const [builderAnswer, setBuilderAnswer] = useState([]);
    const [matchingAnswer, setMatchingAnswer] = useState(null);
    const [readingAnswer, setReadingAnswer] = useState([]);

    // Handlers
    const handleSpeak = () => {
        const voice = voices.find(v => v.name === selectedVoiceName);
        speak(ttsInput, voice);
    };

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

    // Game Validation Helpers
    const checkMC = () => {
        if (mcAnswer === 'opt2') {
            setFeedbackStatus('correct');
            play('correct');
        } else {
            setFeedbackStatus('wrong');
            play('wrong');
        }
    };

    const checkNum = () => {
        if (numAnswer === '8') {
            setFeedbackStatus('correct');
            play('correct');
        } else {
            setFeedbackStatus('wrong');
            play('wrong');
        }
    };

    const checkBuilder = () => {
        const correct = ['B', 'U', 'K', 'U'];
        const isCorrect = builderAnswer.length === correct.length && builderAnswer.every((v, i) => v === correct[i]);
        if (isCorrect) {
            setFeedbackStatus('correct');
            play('correct');
        } else {
            setFeedbackStatus('wrong');
            play('wrong');
        }
    };

    const checkMatching = () => {
        if (matchingAnswer === true) {
            setFeedbackStatus('correct');
            play('correct');
        } else {
            setFeedbackStatus('wrong');
            play('wrong');
        }
    };

    const checkReading = () => {
        const correct = ['B', 'O', 'L', 'A'];
        const isCorrect = readingAnswer.length === correct.length && readingAnswer.every((v, i) => v === correct[i]);
        if (isCorrect) {
            setFeedbackStatus('correct');
            play('correct');
        } else {
            setFeedbackStatus('wrong');
            play('wrong');
        }
    };

    return (
        <div style={{ padding: '20px', paddingBottom: '100px', minHeight: '100vh' }}>
            <h1 style={{ color: 'var(--c-text)', marginBottom: '24px' }}>UI Design System v1.0</h1>

            {/* Audio & Settings */}
            <section style={{ marginBottom: '32px', padding: '16px', background: 'white', borderRadius: '16px', border: '2px solid var(--c-grey)' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '16px' }}>Audio & Settings</h3>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <Button
                        variant={preferences.sound ? "primary" : "secondary"}
                        onClick={toggleSound}
                    >
                        Sound: {preferences.sound ? "ON" : "OFF"}
                    </Button>
                    <Button
                        variant={preferences.music ? "primary" : "secondary"}
                        onClick={toggleMusic}
                    >
                        Music: {preferences.music ? "ON" : "OFF"}
                    </Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ fontWeight: 'bold', color: 'var(--c-text)' }}>Test Text-to-Speech (TTS):</label>

                    {/* Voice Selector */}
                    <Select
                        options={[
                            { value: '', label: '-- Default Indonesian --' },
                            ...voices.map(v => ({ value: v.name, label: `${v.name} (${v.lang})` }))
                        ]}
                        value={selectedVoiceName}
                        onChange={setSelectedVoiceName}
                        placeholder="Select Voice"
                    />

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={ttsInput}
                            onChange={(e) => setTtsInput(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '12px',
                                border: '2px solid var(--c-grey)',
                                fontSize: '16px',
                                fontFamily: 'Nunito'
                            }}
                        />
                        <Button onClick={handleSpeak}>Speak</Button>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--c-grey-dark)' }}>
                        *TTS will only work if Sound is ON.
                    </p>
                </div>
            </section>

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

            {/* Select Input */}
            <section style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--c-text)', marginBottom: '12px' }}>Select / Dropdown</h3>
                <div style={{ maxWidth: '300px' }}>
                    <Select
                        options={[
                            { value: 'apple', label: '🍎 Apple' },
                            { value: 'banana', label: '🍌 Banana' },
                            { value: 'cherry', label: '🍒 Cherry' },
                            { value: 'date', label: '📅 Date' },
                        ]}
                        value={null} // Just a demo, no state needed for visual check or use a dummy state if needed
                        onChange={(val) => console.log('Selected:', val)}
                        placeholder="Choose a fruit..."
                    />
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

            {/* Game Engine Test */}
            <section style={{ marginBottom: '48px' }}>
                <h2 style={{ color: 'var(--c-text)', marginBottom: '24px', textAlign: 'center' }}>🎮 Game Engine Test</h2>

                {/* 1. Multiple Choice */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '16px' }}>1. Multiple Choice (Ans: Apple)</h3>
                    <MultipleChoice
                        question={{
                            text_en: 'Which fruit is red?',
                            text_id: 'Buah mana yang berwarna merah?',
                            options: [
                                { id: 'opt1', text: 'Banana', image: null },
                                { id: 'opt2', text: 'Apple', image: null },
                                { id: 'opt3', text: 'Grape', image: null },
                            ]
                        }}
                        selectedAnswer={mcAnswer}
                        onAnswer={setMcAnswer}
                    />
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Button onClick={checkMC} disabled={!mcAnswer}>Check Answer</Button>
                    </div>
                </div>

                {/* 2. Numeric Input */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '16px' }}>2. Numeric Input (Ans: 8)</h3>
                    <NumericInput
                        question={{
                            text_en: '5 + 3 = ?',
                            text_id: '5 + 3 = ?'
                        }}
                        currentValue={numAnswer}
                        onAnswer={setNumAnswer}
                    />
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Button onClick={checkNum} disabled={!numAnswer}>Check Answer</Button>
                    </div>
                </div>

                {/* 3. Equation Builder */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '16px' }}>3. Equation Builder (Ans: BUKU)</h3>
                    <EquationBuilder
                        question={{
                            pool: ['K', 'U', 'B', 'A', 'U', 'M']
                        }}
                        currentValue={builderAnswer}
                        onAnswer={setBuilderAnswer}
                    />
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Button onClick={checkBuilder} disabled={builderAnswer.length === 0}>Check Answer</Button>
                    </div>
                </div>

                {/* 4. Matching Pairs */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '16px' }}>4. Matching Pairs (Auto-check)</h3>
                    <MatchingPairs
                        question={{
                            text_en: 'Match the pairs',
                            text_id: 'Cocokkan pasangan',
                            pairs: [
                                { id: 'p1', items: [{ content: '🐱' }, { content: 'Cat' }] },
                                { id: 'p2', items: [{ content: '🐶' }, { content: 'Dog' }] }
                            ]
                        }}
                        onAnswer={(val) => {
                            setMatchingAnswer(val);
                            if (val === true) {
                                setFeedbackStatus('correct');
                                play('correct');
                            }
                        }}
                    />
                    <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--c-grey-dark)', marginTop: '8px' }}>
                        *Game finishes automatically when all matched
                    </p>
                </div>

                {/* 5. Reading (Spelling) */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ marginBottom: '16px' }}>5. Reading / Spelling (Ans: BOLA)</h3>
                    <EquationBuilder
                        question={{
                            pool: ['L', 'A', 'B', 'O', 'K', 'U']
                        }}
                        currentValue={readingAnswer}
                        onAnswer={setReadingAnswer}
                    />
                    <div style={{ marginTop: '16px', textAlign: 'center' }}>
                        <Button onClick={checkReading} disabled={readingAnswer.length === 0}>Check Answer</Button>
                    </div>
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
