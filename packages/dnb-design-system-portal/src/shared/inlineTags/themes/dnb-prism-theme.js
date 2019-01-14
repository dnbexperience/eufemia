/**
 * DNB Prism Theme
 *
 */

const dnb_prism_theme = {
  plain: {
    color: 'var(--color-sea-green-4)',
    // backgroundColor: '#011627'
    // backgroundColor: 'var(--color-black-80)'
    backgroundColor: '#222'
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
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
        color: 'var(--color-signal-yellow-30)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'var(--color-summer-green)'
      }
    },
    {
      types: ['variable', 'function-variable'],
      style: {
        color: 'var(--color-sea-green-4)'
      }
    },
    // In CSS numbers and units are tide together. To show them nicer, use same color as plain
    {
      types: ['number'],
      style: {
        color: 'var(--color-sea-green-4)'
      }
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'var(--color-indigo-medium)'
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'var(--color-violet-medium)'
      }
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'var(--color-violet-medium)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'var(--color-signal-yellow)'
      }
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'var(--color-mint-green)'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: 'var(--color-cherry-red)'
      }
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)'
      }
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)'
      }
    }
  ]
}

export default dnb_prism_theme
