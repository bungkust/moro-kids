import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { getCurrentUser } from '../db/repositories';

const useAppInit = () => {
    const [status, setStatus] = useState({ isLoading: true, hasUser: false });
    const setUser = useStore((state) => state.setUser);

    useEffect(() => {
        const init = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    setUser(user);
                    setStatus({ isLoading: false, hasUser: true });
                } else {
                    setStatus({ isLoading: false, hasUser: false });
                }
            } catch (error) {
                console.error('Initialization failed:', error);
                setStatus({ isLoading: false, hasUser: false });
            }
        };

        init();
    }, [setUser]);

    return status;
};

export default useAppInit;
