/**
 * Lighthouse CI Configuration
 * 
 * This configuration runs Lighthouse audits on the portal to ensure
 * performance, accessibility, best practices, and SEO standards are met.
 */

module.exports = {
  ci: {
    collect: {
      staticDistDir: './packages/dnb-design-system-portal/public',
      url: [
        // Main pages to audit
        'http://localhost/uilib/',
        'http://localhost/uilib/getting-started/',
        'http://localhost/uilib/components/',
        'http://localhost/uilib/components/button/',
        'http://localhost/uilib/extensions/forms/',
        'http://localhost/quickguide-designer/',
        'http://localhost/contribute/',
      ],
      numberOfRuns: 3, // Run multiple times for more accurate results
      settings: {
        preset: 'desktop',
        // Disable PWA audit as this is a documentation site
        skipAudits: ['service-worker', 'installable-manifest', 'splash-screen', 'themed-omnibox', 'maskable-icon'],
      },
    },
    assert: {
      assertions: {
        // Performance budgets
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['warn', { minScore: 0.90 }],

        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],

        // Accessibility specifics
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'warn',
        'valid-lang': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'aria-valid-attr-value': 'error',
        'aria-valid-attr': 'error',
        'button-name': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',

        // Best practices
        'uses-http2': 'off', // Can't control this in static server
        'uses-passive-event-listeners': 'warn',
        'no-vulnerable-libraries': 'error',
        'errors-in-console': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
      // Stores results for 7 days on public storage
      // Can be changed to 'filesystem' for CI artifacts
    },
  },
}
