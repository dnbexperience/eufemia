declare namespace jest {
  interface Matchers<R> {
    toBeType(received: string, expected?: string): R;
    toNeverResolve(): Promise<R>;
  }
}

declare module 'lebab' {
  export function transform(
    code: string,
    transforms: string[]
  ): { code: string; warnings: unknown[]; map?: unknown };
}
