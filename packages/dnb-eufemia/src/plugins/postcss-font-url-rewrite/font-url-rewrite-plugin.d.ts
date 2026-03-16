export = postcssFontUrlRewrite;
declare function postcssFontUrlRewrite(opts?: {}): {
    postcssPlugin: string;
    AtRule: {
        'font-face'(atRule: any): void;
    };
};
declare namespace postcssFontUrlRewrite {
    let postcss: boolean;
}
