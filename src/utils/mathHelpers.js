export const generateQuestion = (level = 1) => {
    // Simple logic for Phase 0/1: Addition up to 10 * level
    const max = 10 * level;
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const answer = a + b;
    const question = `${a} + ${b} = ?`;

    // Generate distractors
    const options = new Set([answer]);
    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 5) + 1;
        const distractor = Math.random() > 0.5 ? answer + offset : answer - offset;
        if (distractor > 0) {
            options.add(distractor);
        }
    }

    return {
        id: Date.now(),
        question,
        answer,
        options: Array.from(options).sort(() => Math.random() - 0.5)
    };
};
