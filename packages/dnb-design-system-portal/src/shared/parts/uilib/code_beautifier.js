/**
 * StyleGuide Component Item
 *
 */

import cleanHtml from 'clean-html' // https://github.com/dave-kennedy/clean-html

const Beautifier = (source, language, opts = {}) =>
  new Promise((resolve) => {
    switch (language) {
      case 'html':
        cleanHtml.clean(
          source,
          {
            indent: '  ',
            wrap: 80,
            'replace-nbsp': true,
            // 'remove-comments': true,
            // 'add-break-around-tags': ['span'],
            'remove-tags': [],
            'remove-attributes': [],
            'break-around-tags': opts.breakAroundTags || [
              'div',
              'span',
              'p',
              'button',
              'input',
              'svg',
              'path',
              // 'body',
              // 'blockquote',
              // 'br'
              // 'div',
              // 'h1',
              // 'h2',
              // 'h3',
              // 'h4',
              // 'h5',
              // 'h6',
              // 'head',
              // 'hr',
              // 'link',
              // 'meta',
              // 'p',
              // 'table',
              // 'title',
              // 'td',
              // 'tr'
            ],
          },
          (res) => resolve(res) //.replace(/>(\n\s+)<\//g, ' />$1</')
        )
        break
    }
  })

export default Beautifier
