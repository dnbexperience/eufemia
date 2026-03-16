export type PointerPath = string | Array<string>;
export type JsonValue = unknown;
export type JsonObject = Record<string | number, unknown> | Array<unknown>;
/**
 * Lookup a json pointer in an object
 */
export declare function get<T = JsonObject>(obj: T, pointer: PointerPath): T;
/**
 * Sets a value on an object
 */
export declare function set<T = JsonObject>(obj: T, pointer: PointerPath, value: JsonValue): void;
/**
 * Removes an attribute
 */
export declare function remove<T = JsonObject>(obj: T, pointer: PointerPath): void;
/**
 * Returns a (pointer -> value) dictionary for an object
 */
export declare function dict<T = JsonObject>(obj: T, descend?: any): {};
/**
 * Iterates over an object
 */
export declare function walk<T = JsonObject>(obj: T, iterator: any, descend?: any): void;
/**
 * Tests if an object has a value for a json pointer
 */
export declare function has<T = JsonObject>(obj: T, pointer: PointerPath): boolean;
/**
 * Escapes a reference token
 */
export declare function escape(str: string): string;
/**
 * Unescape a reference token
 */
export declare function unescape(str: string): string;
/**
 * Converts a json pointer into a array of reference tokens
 */
export declare function parse(pointer: Extract<PointerPath, string>): PointerPath;
/**
 * Builds a json pointer from a array of reference tokens
 */
export declare function compile(refTokens: Extract<PointerPath, Array<string>>): string;
