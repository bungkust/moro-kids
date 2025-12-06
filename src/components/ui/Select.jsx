import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import './Select.css';

const Select = ({ options = [], value, onChange, placeholder = 'Select option' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="select-container" ref={containerRef}>
            {/* Trigger Button */}
            <div
                className="select-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span style={{ color: selectedOption ? 'var(--c-text)' : 'var(--c-grey-dark)' }}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <CaretDown size={20} weight="bold" />
                </motion.div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="select-dropdown"
                        initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ originY: 0 }} // Scale from top
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className={`select-item ${value === option.value ? 'selected' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.icon && <span>{option.icon}</span>}
                                {option.label}
                            </div>
                        ))}
                        {options.length === 0 && (
                            <div className="select-item" style={{ color: 'var(--c-grey-dark)', justifyContent: 'center' }}>
                                No options
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Select;
