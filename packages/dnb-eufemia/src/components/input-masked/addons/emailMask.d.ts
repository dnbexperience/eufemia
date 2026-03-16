import emailPipe from './emailPipe';
declare function emailMask(rawValue: string, config: {
    placeholderChar: string;
    currentCaretPosition?: number;
}): Array<string | RegExp>;
declare const _default: {
    mask: typeof emailMask;
    pipe: typeof emailPipe;
};
export default _default;
