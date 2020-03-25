/**
 * DNB Prism Theme
 *
 */

const prismTheme = {
  plain: {
    color: 'var(--color-mint-green-12)',
    backgroundColor: '#222'
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'var(--color-accent-yellow-30)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: 'var(--color-fire-red)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'var(--color-summer-green)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'var(--color-accent-yellow-30)',
        fontStyle: 'italic',
        opacity: '0.8'
      }
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'var(--color-summer-green)'
      }
    },
    {
      types: ['variable'],
      style: {
        color: 'var(--color-mint-green-50)'
      }
    },
    {
      types: ['number'],
      style: {
        color: 'var(--color-mint-green-12)'
      }
    },
    {
      types: ['builtin', 'char', 'constant'], //, 'function'
      style: {
        color: 'var(--color-violet-medium)'
      }
    },
    {
      types: ['function'],
      style: {
        color: 'var(--color-sky-blue-medium)'
      }
    },
    {
      types: ['punctuation'],
      style: {
        color: 'var(--color-violet-medium)'
      }
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'var(--color-sea-green-30)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'var(--color-sea-green)'
      }
    },
    {
      types: ['operator', 'keyword', 'attr-value'],
      style: {
        color: 'var(--color-mint-green)'
      }
    },
    {
      types: ['tag'],
      style: {
        color: 'var(--color-sea-green)'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: 'var(--color-sky-blue)'
      }
    },
    {
      types: ['property'],
      style: {
        color: 'var(--color-mint-green)'
      }
    },
    {
      types: ['namespace'],
      style: {
        color: 'var(--color-indigo-light)'
      }
    }
  ]
}

export default prismTheme
