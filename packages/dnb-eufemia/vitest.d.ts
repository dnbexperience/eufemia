import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toNeverResolve(): Promise<T>;
  }
  interface AsymmetricMatchersContaining {
    toNeverResolve(): void;
  }
}
