
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import './Slider.css';

const Slider = ({ min = 0, max = 10, value, onChange, customLabels }) => {
    const trackRef = useRef(null);
    const [trackWidth, setTrackWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);

    // Determine effective range
    const effectiveMin = customLabels ? 0 : min;
    const effectiveMax = customLabels ? customLabels.length - 1 : max;
    const stepCount = effectiveMax - effectiveMin;

    // Helper to get label
    const getLabel = (val) => {
        if (customLabels) {
            // Clamp index to array bounds
            const index = Math.max(0, Math.min(Math.round(val), customLabels.length - 1));
            return customLabels[index];
        }
        return Math.round(val);
    };

    // Measure track width
    useEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (trackRef.current) {
                setTrackWidth(trackRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sync x with value prop when NOT dragging
    useEffect(() => {
        if (!isDragging && trackWidth > 0) {
            const stepWidth = trackWidth / stepCount;
            // Ensure value is within bounds
            const clampedValue = Math.max(effectiveMin, Math.min(value, effectiveMax));
            const targetX = (clampedValue - effectiveMin) * stepWidth;
            animate(x, targetX, { type: 'spring', stiffness: 300, damping: 30 });
        }
    }, [value, effectiveMin, effectiveMax, trackWidth, stepCount, isDragging, x]);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        const currentX = x.get();
        const stepWidth = trackWidth / stepCount;

        // Calculate nearest step
        let stepsTaken = Math.round(currentX / stepWidth);

        // Clamp steps
        stepsTaken = Math.max(0, Math.min(stepsTaken, stepCount));

        const newValue = effectiveMin + stepsTaken;
        const newX = stepsTaken * stepWidth;

        // Snap animation
        animate(x, newX, { type: 'spring', stiffness: 400, damping: 25 });

        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="slider-container">
            <div className="slider-track" ref={trackRef}>
                {/* Ticks & Labels */}
                {Array.from({ length: stepCount + 1 }).map((_, index) => {
                    const tickValue = effectiveMin + index;
                    const leftPos = (index / stepCount) * 100;
                    const label = getLabel(tickValue);

                    return (
                        <React.Fragment key={tickValue}>
                            <div
                                className="slider-tick"
                                style={{ left: `${leftPos}% ` }}
                            />
                            <span
                                className="slider-tick-label"
                                style={{ left: `${leftPos}% ` }}
                            >
                                {label}
                            </span>
                        </React.Fragment>
                    );
                })}

                {/* Handle */}
                <motion.div
                    className="slider-handle"
                    drag="x"
                    dragConstraints={trackRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{ x }}
                // So x should range from 0 to trackWidth.
                // And we apply `translateX(-50 %)` via style or transformTemplate?
                // Let's try using a wrapper or just adjusting the visual center.
                // If x=0, handle left edge is at 0. We want center at 0. So x should be -24px?
                // Let's use `x` for position along track, and `translateX: '-50%'` in style?
                // Framer motion x is basically translateX.
                // We can use `left` instead of x? No, drag uses transform.
                // Let's use `x` and subtract half handle width in the calculation?
                // Or just set `margin - left: -24px` in CSS.
                >
                    <span className="slider-value-label">{value}</span>
                </motion.div>
            </div>
        </div>
    );
};

export default Slider;
