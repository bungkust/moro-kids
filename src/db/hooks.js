import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './index';

export function useCurrentUser() {
    return useLiveQuery(() => db.users.toCollection().first());
}
