import { v4 as uuidv4 } from 'uuid';
import { db } from './index';

export async function createGuestUser() {
    const userId = uuidv4();
    await db.users.add({
        id: userId,
        username: 'Guest',
        level: 1,
        xp: 0,
        hearts: 5,
        created_at: new Date().toISOString()
    });
    return userId;
}
