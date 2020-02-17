const GHSlugger = require('github-slugger')
const slugger = new GHSlugger()

exports.makeSlug = function(value, slug) {
  slugger.reset()

  // custom id (https://www.markdownguide.org/extended-syntax/#heading-ids)
  if (!slug && Array.isArray(value)) {
    const _slug = value
      .reduce((acc, cur) => {
        let s = typeof cur === 'string' ? cur : getChild(cur)
        if (typeof s === 'string') {
          if (/\{#(.*)\}/.test(s)) {
            s = String(s + /\{#([^}]*)\}/.exec(s)[1]).trim()
          }
          acc.push(s)
        }
        return acc
      }, [])
      .join('')
    slug = slugger.slug(_slug)
  } else if (!slug && typeof value === 'string') {
    if (/\{#(.*)\}/.test(value)) {
      slug = /\{#([^}]*)\}/.exec(value)[1]
    } else {
      slug = slugger.slug(value)
    }
  }

  if (
    !slug &&
    typeof value === 'object' &&
    value.props &&
    typeof value.props.source !== 'undefined'
  ) {
    slug = slugger.slug(value.props.source)
  }

  return slug
}

const getChild = (obj, ret = '', count = 0) => {
  if (obj.props && typeof obj.props.children === 'string') {
    ret += obj.props.children
  } else if (
    obj.props &&
    typeof obj.props.children === 'object' &&
    count < 8
  ) {
    count++
    return getChild(obj.props.children, ret, count)
  }
  return ret
}
