import { v4 as uuidv4 } from 'uuid';
import db from './index';

export const createGuestUser = async (initialData = {}) => {
    const userId = uuidv4();
    const defaultData = {
        id: userId,
        username: 'Guest',
        level: 1,
        xp: 0,
        hearts: 5,
        streak: 0,
        settings: { sound: true, music: true },
        created_at: new Date().toISOString(),
        ...initialData
    };

    await db.users.add(defaultData);
    return defaultData;
};

export const getCurrentUser = async () => {
    // Get the last created user (assuming single user for now or last active)
    const users = await db.users.toArray();
    return users.length > 0 ? users[users.length - 1] : null;
};

export const updateUserStats = async (userId, statsObj) => {
    if (!userId) return;

    await db.users.update(userId, statsObj);
    return await db.users.get(userId);
};

export const logProgress = async (logData) => {
    // logData: { user_id, question_id, type, is_correct, score_gained }
    const log = {
        ...logData,
        timestamp: new Date().toISOString(),
        is_synced: 0
    };
    await db.progress_logs.add(log);
    return log;
};
