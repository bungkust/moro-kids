import Dexie from 'dexie';

const db = new Dexie('MoroDatabase');

db.version(1).stores({
    users: 'id, username, level, xp, hearts, streak, settings, created_at',
    progress_logs: 'id, user_id, question_id, type, is_correct, score_gained, timestamp, is_synced'
});

export default db;
