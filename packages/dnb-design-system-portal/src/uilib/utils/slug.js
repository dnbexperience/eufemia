const GHSlugger = require('github-slugger')
const slugger = new GHSlugger()

exports.makeSlug = function makeSlug(value, slug = null) {
  slugger.reset()

  if (slug) {
    return slugger.slug(slug)
  }

  // custom id (https://www.markdownguide.org/extended-syntax/#heading-ids)
  if (Array.isArray(value)) {
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
  } else if (typeof value === 'string') {
    if (/\{#(.*)\}/.test(value)) {
      slug = /\{#([^}]*)\}/.exec(value)[1]
    } else {
      slug = slugger.slug(value)
    }
  } else if (typeof value === 'object') {
    if (typeof value?.props?.source !== 'undefined') {
      slug = slugger.slug(value.props.source)
    } else if (typeof value?.props?.children !== 'undefined') {
      slug = slugger.slug(String(value.props.children))
    }
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
