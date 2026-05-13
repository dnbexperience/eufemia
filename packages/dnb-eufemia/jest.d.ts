import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toBeType(received: string, expected?: string): R;
      toNeverResolve(): Promise<R>;
      toHaveNoViolations(): R;
    }
  }
}
