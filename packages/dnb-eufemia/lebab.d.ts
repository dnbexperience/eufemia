declare module 'lebab' {
  export function transform(
    code: string,
    transforms: string[]
  ): { code: string; warnings: unknown[]; map?: unknown };
}
