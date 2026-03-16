/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns event handler function
 */
export declare const useCallEvent: ({ setLocalValue, }: {
    setLocalValue: (v: string) => void;
}) => ({ event, value }: {
    event: any;
    value?: any;
}, name: string) => any;
