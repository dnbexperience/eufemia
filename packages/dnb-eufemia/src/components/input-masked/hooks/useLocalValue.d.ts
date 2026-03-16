/**
 * Handle internal value state
 *
 * It handles both the value state given as a prop form outside,
 * along with the current written and internal value.
 *
 * @returns object with internal value state and state setter
 */
import React from 'react';
export declare const useLocalValue: () => {
    localValue: string;
    setLocalValue: React.Dispatch<React.SetStateAction<string>>;
};
