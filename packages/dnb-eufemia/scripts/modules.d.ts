declare module 'packpath' {
  const packpath: {
    self(): string;
    parent(): string;
  };
  export default packpath;
}

declare module 'current-git-branch' {
  function getBranchName(options?: Record<string, unknown>): string;
  export default getBranchName;
}
