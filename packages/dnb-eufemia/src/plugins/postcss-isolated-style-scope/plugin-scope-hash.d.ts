export type GetStyleScopeHashOptions = {
  version?: string;
  sha?: string;
};

export function getStyleScopeHash(opts?: GetStyleScopeHashOptions): string;
