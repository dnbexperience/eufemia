import React from 'react';
export declare function useSliderEvents(): {
    onThumbMouseDownHandler: (event: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
    onThumbMouseUpHandler: () => void;
    onTrackMouseDownHandler: (event: MouseEvent | TouchEvent) => void;
    onHelperChangeHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    onHelperFocusHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    removeEvents: () => void;
};
