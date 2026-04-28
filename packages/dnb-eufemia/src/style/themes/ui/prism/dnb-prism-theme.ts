/**
 * DNB Prism Theme
 *
 */

const italic = 'italic' as const
const prismTheme = {
  plain: {
    color: 'var(--token-color-decorative-third-muted-static)',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'var(--token-color-background-warning)',
        fontStyle: italic,
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'var(--token-color-icon-error)',
        fontStyle: italic,
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'var(--token-color-text-positive-inverse)',
        fontStyle: italic,
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'var(--token-color-background-warning)',
        fontStyle: italic,
        opacity: 0.8,
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'var(--token-color-text-positive-inverse)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'var(--token-color-decorative-first-muted-static)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'var(--token-color-decorative-third-muted-static)',
      },
    },
    {
      types: ['builtin', 'char', 'constant'],
      style: {
        color: 'var(--token-color-decorative-second-muted-static)',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'var(--token-color-decorative-second-subtle-static)',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: 'var(--token-color-decorative-second-muted-static)',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'var(--token-color-decorative-first-base-static)',
        fontStyle: italic,
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'var(--token-color-decorative-second-subtle-static)',
      },
    },
    {
      types: ['operator', 'keyword', 'attr-value'],
      style: {
        color: 'var(--token-color-decorative-first-subtle-static)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'var(--token-color-decorative-second-subtle-static)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'var(--token-color-text-positive)',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'var(--token-color-decorative-first-subtle-static)',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'var(--token-color-decorative-third-bold-static)',
      },
    },
  ],
}

export default prismTheme
