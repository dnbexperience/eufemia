import type { RefObject } from 'react';
declare function useHandleCursorPosition(inputRefs: RefObject<HTMLInputElement>[], keysToHandle?: RegExp | {
    [inputId: string]: RegExp[];
}): {
    onKeyDown: (event: React.KeyboardEvent) => void;
};
export default useHandleCursorPosition;
