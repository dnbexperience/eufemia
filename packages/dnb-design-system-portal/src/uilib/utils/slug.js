const GHSlugger = require('github-slugger')
const slugger = new GHSlugger()

exports.makeSlug = function(value, slug) {
  slugger.reset()

  // custom id (https://www.markdownguide.org/extended-syntax/#heading-ids)
  if (!slug && Array.isArray(value)) {
    const { _slug, _value } = value.reduce(
      (acc, cur) => {
        if (typeof cur === 'string') {
          if (/\{#(.*)\}/.test(cur)) {
            acc._slug = String(
              acc._slug + /\{#([^}]*)\}/.exec(cur)[1]
            ).trim()

            // do not return the value
            return acc
          } else {
            acc._slug = String(acc._slug + cur).trim()
          }
        }
        acc._value.push(cur)
        return acc
      },
      { _slug: '', _value: [] }
    )
    slug = slugger.slug(_slug)
    value = _value
  } else if (!slug && typeof value === 'string') {
    if (/\{#(.*)\}/.test(value)) {
      slug = /\{#([^}]*)\}/.exec(value)[1]
    } else {
      slug = slugger.slug(value)
    }
    value = value.replace(/\{#(.*)\}/g, '').trim()
  }

  if (!slug && typeof value === 'object' && value.props.source) {
    slug = slugger.slug(value.props.source)
  }

  return slug
}
