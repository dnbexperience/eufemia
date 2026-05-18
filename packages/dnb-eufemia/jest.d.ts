import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toNeverResolve(): Promise<R>;
      toHaveNoViolations(): R;
    }
  }
}
