declare namespace jest {
  interface Matchers<R> {
    toBeType(received: string, expected?: string): R;
  }
}
