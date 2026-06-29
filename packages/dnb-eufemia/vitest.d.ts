/* eslint-disable @typescript-eslint/consistent-type-definitions */
import '@testing-library/jest-dom';
import 'vitest';

declare namespace matchers {
  interface TestingLibraryMatchers<E, R> {
    toHaveClass(classNames: string, options?: { exact?: boolean }): R;
  }
}

declare module 'vitest' {
  interface Matchers<T> {
    toHaveNoViolations(): T;
    toNeverResolve(options?: {
      timeout?: number;
      interval?: number;
    }): Promise<T>;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Assertion<T> extends Matchers<T> {}

  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
    toNeverResolve(options?: {
      timeout?: number;
      interval?: number;
    }): void;
  }
}
