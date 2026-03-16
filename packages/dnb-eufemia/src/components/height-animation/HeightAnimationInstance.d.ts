export type HeightAnimationOnStartStates = 'opening' | 'closing' | 'adjusting';
export type HeightAnimationOnEndStates = 'opened' | 'closed' | 'adjusted';
export type HeightAnimationStates = HeightAnimationOnStartStates | HeightAnimationOnEndStates | 'init';
export type HeightAnimationOptions = {
    animate?: boolean;
};
export type HeightAnimationOnStartCallback = (state: HeightAnimationStates) => void;
export type HeightAnimationOnEndCallback = (state: HeightAnimationStates) => void;
export type HeightAnimationOnStartStack = Array<HeightAnimationOnStartCallback>;
export type HeightAnimationOnEndStack = Array<HeightAnimationOnEndCallback>;
export type HeightAnimationEventListener = (e: Event) => void;
export type HeightAnimationEvents = Array<HeightAnimationEventListener>;
export type HeightAnimationElement = HTMLElement;
export type HeightAnimationContainer = HTMLElement;
export type HeightAnimationFromHeight = number;
export type HeightAnimationToHeight = number;
export default class HeightAnimation {
    private state;
    isInBrowser: boolean;
    onStartStack: HeightAnimationOnStartStack;
    onEndStack: HeightAnimationOnEndStack;
    events: HeightAnimationEvents;
    opts: HeightAnimationOptions;
    elem: HeightAnimationElement;
    reqId1: number;
    reqId2: number;
    resizeTimeout: NodeJS.Timeout;
    timeouts: NodeJS.Timeout[];
    firstTime?: number;
    startTime?: number;
    duration?: number;
    isAnimating: boolean;
    __currentHeight: number;
    firstPaintStyle: {
        readonly visibility: "hidden";
        readonly opacity: "0";
        readonly height: "auto";
    };
    constructor(opts?: HeightAnimationOptions);
    callAnimationStart(): void;
    callAnimationEnd(): void;
    addEndEvent(listener: HeightAnimationEventListener): void;
    removeEndEvents(): void;
    setElement(elem: HeightAnimationElement): void;
    setState(state: HeightAnimationStates): void;
    setOptions(opts: HeightAnimationOptions): void;
    getOptions(): HeightAnimationOptions;
    remove(): void;
    setAsOpen(): void;
    setAsClosed(): void;
    getHeight(): number;
    getUnknownHeight(): number;
    withFallback(elem: HTMLElement, key: 'clientHeight' | 'clientWidth', fallback?: 'data-height' | 'data-width'): number;
    onStart(fn: HeightAnimationOnStartCallback): void;
    onEnd(fn: HeightAnimationOnEndCallback): void;
    start(fromHeight: HeightAnimationFromHeight, toHeight: HeightAnimationToHeight): void;
    stop(): void;
    open(): void;
    close(): void;
    adjustTo(fromHeight?: HeightAnimationFromHeight, toHeight?: HeightAnimationToHeight): void;
    readjust(): void;
    /**
     * Determines whether the animation can finish.
     * Check for certain states and if the time passed is too short.
     * With a so short first state change, we do not call animation end.
     */
    canFinish(): boolean;
    /**
     * Determines whether the animation should be bypassed.
     * Check for certain states and if the time passed is too short to be correct.
     * With a very short first state change, we skip animation.
     */
    shouldBypassAnimation(): boolean;
}
