import * as z from 'zod';
import type { Path } from '../../types';
/**
 * Extract a Zod subschema using a JSON Pointer like "/mySchema/secondSubSchema".
 * Supports objects, arrays, tuples, and records. For unions/intersections,
 */
export declare function extractZodSubSchema(root: z.ZodTypeAny, pointer: Path): z.ZodTypeAny;
export declare function unwrap(t: z.ZodTypeAny | unknown): z.ZodTypeAny;
export declare function decodePointerSegment(seg: string): string;
