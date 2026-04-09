/**
 * Augments `globalThis` so test-control knobs and global caches
 * can be accessed without `as any` casts.
 */

export {};

declare global {
  // Test-control knobs – set by the test harness
  var IS_TEST: boolean | undefined;
  var readjustTime: number | undefined;
  var bypassTime: number | undefined;
  var animationDuration: number | undefined;

  // Spacing calc cache – SpacingUtils.ts
  var CALC_CACHE: Record<string, string>;
}
