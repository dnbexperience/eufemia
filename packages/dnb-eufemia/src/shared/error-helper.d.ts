/**
 * Global Error helper functions
 *
 */
export declare const ERROR_HARMLESS: 100;
export declare const ERROR_FATAL: 500;
export declare function ErrorHandler(this: {
    err?: Error;
} | void, error: string | {
    message: string;
}, { message }?: {
    message: string | null;
}, code?: number): void;
