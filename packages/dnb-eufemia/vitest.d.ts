import '@testing-library/jest-dom';
import 'vitest';

declare module 'vitest' {
  interface Matchers<T> {
    toHaveNoViolations(): T;
    toNeverResolve(): Promise<T>;
  }

  interface Assertion<T> extends Matchers<T> {}

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
    toNeverResolve(): void;
  }
}
