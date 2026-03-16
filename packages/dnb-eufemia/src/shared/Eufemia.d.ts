export declare const version: string;
export declare const sha: string;
export declare const buildDate: string;
declare global {
    interface Window {
        Eufemia?: {
            version?: string;
            sha?: string;
            buildDate?: string;
            shas?: Array<string>;
            versions?: Array<{
                js: string;
                css: string;
                sha: string;
                scopeElement: Element | null;
            }>;
        };
        __eufemiaVersions?: Array<string>;
        __eufemiaSHAs?: Array<string>;
    }
}
export declare function init(): void;
