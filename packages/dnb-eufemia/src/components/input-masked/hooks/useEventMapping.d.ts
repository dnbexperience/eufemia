/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */
export declare const useEventMapping: ({ setLocalValue }: {
    setLocalValue: any;
}) => {
    onBeforeInput: (event: any) => any;
    onInput: (event: any) => any;
    onFocus: (params: any) => any;
    onBlur: (params: any) => any;
    onMouseUp: (event: any) => any;
    onMouseDown: (event: any) => any;
    onKeyDown: (params: any) => any;
    onSubmit: (params: any) => any;
    onChange: (params: any) => any;
};
