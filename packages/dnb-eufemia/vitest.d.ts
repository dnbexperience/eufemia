import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toBeType(expected: string): T;
    toNeverResolve(): Promise<T>;
  }
  interface AsymmetricMatchersContaining {
    toBeType(expected: string): void;
    toNeverResolve(): void;
  }
}
