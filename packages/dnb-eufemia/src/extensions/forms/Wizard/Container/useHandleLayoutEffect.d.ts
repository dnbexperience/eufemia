export default function useHandleLayoutEffect({ elementRef, stepElementRef, }: {
    elementRef: any;
    stepElementRef: any;
}): {
    setFocus: () => void;
    scrollToTop: () => void;
    isInteractionRef: import("react").RefObject<boolean>;
};
