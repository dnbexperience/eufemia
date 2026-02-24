/**
 * Central config for conditional screenshot selection.
 * Keep all static knobs here so logic files stay focused on behavior.
 */

// These files can change screenshot behavior globally, so any change forces full visual coverage.
export const GLOBAL_VISUAL_FILES = new Set([
  'package.json',
  'jest.config.screenshots',
  'playwright.config',
])

// Shared style/test infra paths are cross-cutting; selective mapping is too error-prone here.
export const GLOBAL_VISUAL_PATH_PREFIXES = ['src/style/', 'src/core/jest/']

// Source paths that should not influence visual screenshot selection.
export const NON_VISUAL_SOURCE_PATH_PREFIXES = []

// Source files that should not trigger visual dependency expansion.
export const NON_VISUAL_SOURCE_FILES = new Set([])

// Protected branches always run full suite to maximize confidence before broad consumption.
export const CI_ALWAYS_RUN_BRANCHES = ['main', 'beta']

// Above this impact level, partial runs give little gain; full run is simpler and safer.
export const DEFAULT_IMPACTED_THRESHOLD = 0.4

// Manual escape hatch to force full suite when selective logic is not desired.
export const RUN_ALL_COMMIT_FLAG = '--run-all'

// CI provides changed files through this environment variable.
export const CHANGED_FILES_ENV_VAR = 'VISUAL_TEST_CHANGED_FILES'

// Optional override for local/base ref selection when diffing a branch.
export const BASE_REF_ENV_VAR = 'VISUAL_TEST_BASE_REF'

// Default base refs used to find merge-base when no override is provided.
export const DEFAULT_BRANCH_BASE_REFS = [
  'origin/main',
  'main',
  'origin/portal',
  'portal',
]

// Adds support for release branches like v1, v2, etc. as potential bases.
export const VERSION_BRANCH_REF_PATTERN = /^(origin\/)?v[0-9]/

// Skips technical path segments when deriving component/entity names.
// Avoids matching generic folder names (style/hooks/__tests__) as entities, which would over-trigger unrelated composition impacts.
export const IGNORED_ENTITY_SEGMENTS = new Set([
  '__tests__',
  'style',
  'styles',
  'theme',
  'themes',
  'utils',
  'helpers',
  'hooks',
  'types',
])

// Avoids exploding SCSS reverse deps through the global aggregate entrypoint.
export const SCSS_REVERSE_DEPENDENCY_EXCLUDED_SOURCES = new Set([
  'src/style/dnb-ui-components.scss',
])

// Defines repo root for package-relative path normalization.
export const PACKAGE_PREFIX = 'packages/dnb-eufemia/'

// Maps changed portal files to docs-relative paths for impact lookups.
export const PORTAL_DOCS_REPO_PREFIX =
  'packages/dnb-design-system-portal/src/docs/'

// Resolves portal docs root from packageRoot in context creation.
export const PORTAL_DOCS_ROOT_SEGMENTS = [
  '..',
  'dnb-design-system-portal',
  'src',
  'docs',
] as const

// Reads screenshot URL paths used inside screenshot test files.
export const PORTAL_DOCS_PATH_PREFIX = '/uilib/'

// Detects screenshot test files that are candidates for selective runs.
export const SCREENSHOT_FILE_PATTERN =
  /\.screenshot\.test\.(js|jsx|ts|tsx)$/

// Defines which docs files can influence visual composition matching.
export const PORTAL_FILE_PATTERN = /\.(mdx|tsx|ts|jsx|js)$/

// Parses screenshot URL declarations inside test files.
export const SCREENSHOT_URL_PATTERN = /url\s*:\s*['"`]([^'"`]+)['"`]/g

// Parses both Sass syntaxes so dependency graph includes modern @use.
export const SCSS_IMPORT_PATTERN = /@(import|use)\s+([^;]+);/g
