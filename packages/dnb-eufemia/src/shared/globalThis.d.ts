/**
 * Augments `globalThis` so test-control knobs and global caches
 * can be accessed without `as any` casts.
 */

import type { Page } from '@playwright/test';

export {};

declare global {
  // Test-control knobs – set by the test harness
  var IS_TEST: boolean | undefined;
  var readjustTime: number | undefined;
  var bypassTime: number | undefined;
  var animationDuration: number | undefined;

  // Spacing calc cache – SpacingUtils.ts
  var CALC_CACHE: Record<string, string>;

  // Screenshot test infrastructure – jestSetupScreenshots.ts
  var page: Page | undefined;
  var themeName: string | undefined;
  var pageUrl: string | undefined;
  var pageViewport: { width: number; height: number } | undefined;
  var rootClassName: string | string[] | null | undefined;
  var __VISUAL_TEST_RETRY__: boolean | undefined;
}
