import { useState, useEffect } from 'react';

export const useStorage = (key, defaultValue) => {
    const storage = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(key);
            const initial = stored ? JSON.parse(stored) : defaultValue;
            return initial;
        } else {
            return null;
        }
    };

    const [value, setValue] = useState(storage);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
