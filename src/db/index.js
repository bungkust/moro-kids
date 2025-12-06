import Dexie from 'dexie';

export const db = new Dexie('MoroDatabase');

db.version(1).stores({
    users: 'id, username, level, xp, hearts, created_at',
    progress_logs: 'id, user_id, question_id, type, is_correct, timestamp, is_synced'
});
