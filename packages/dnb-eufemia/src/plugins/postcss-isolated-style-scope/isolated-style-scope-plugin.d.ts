export = postcssIsolateStyle;
declare function postcssIsolateStyle(opts?: {}): {
    postcssPlugin: string;
    Once(root: any): void;
};
declare namespace postcssIsolateStyle {
    let postcss: boolean;
}
