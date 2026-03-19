declare module '@ungap/structured-clone' {
  const structuredClone: <T>(
    value: T,
    options?: StructuredSerializeOptions
  ) => T;
  export default structuredClone;
}
