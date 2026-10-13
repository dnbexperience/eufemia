module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        /**
         * Customize default plugin options
         */
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },
          removeViewBox: false, // to ensure we can scale the svg by font-size later
          // convertPathData: false, // if we prefer to not transform any data paths, we have to disable this
        },
      },
    },
    {
      // Figma wraps many icons in such a clip path. It has no visual effect,
      // but its fixed id repeats every time an icon is shown more than once.
      name: 'removeViewBoxClipPath',
      fn: () => ({
        root: {
          enter: (root) => {
            const svg = root.children.find((node) => node.name === 'svg')
            const [x, y, width, height] = String(svg?.attributes.viewBox)
              .split(/[\s,]+/)
              .map(Number)

            if (x !== 0 || y !== 0) {
              return // stop here
            }

            const ids = new Set()
            walk(svg, (node) => {
              if (
                node.name === 'clipPath' &&
                coversArea(node, width, height)
              ) {
                ids.add(node.attributes.id)
                return false
              }
              return true
            })
            walk(svg, (node) => {
              const id = /^url\(#(.+)\)$/.exec(
                node.attributes['clip-path']
              )?.[1]
              if (ids.has(id)) {
                delete node.attributes['clip-path']
              }
              return true
            })
          },
        },
      }),
    },
    {
      name: 'prefixIds',
      params: {
        prefixIds: true,
        prefixClassNames: false,
      },
    },
  ],
}

/** Calls the callback for every element and removes it when the callback returns false */
function walk(parent, callback) {
  parent.children = parent.children.filter(
    (node) => node.type !== 'element' || callback(node) !== false
  )
  parent.children.forEach(
    (node) => node.type === 'element' && walk(node, callback)
  )
}

function coversArea(clipPath, width, height) {
  const [shape, ...rest] = clipPath.children.filter(
    (node) => node.type === 'element'
  )

  if (
    !shape ||
    rest.length > 0 ||
    Object.keys(clipPath.attributes).some((name) => name !== 'id') ||
    shape.attributes.transform
  ) {
    return false
  }

  const { d } = shape.attributes
  const match = /^M0[\s,]?0h([\d.]+)v([\d.]+)H0(?:V0)?z$/i.exec(d)

  return (
    shape.name === 'path' &&
    Number(match?.[1]) === width &&
    Number(match?.[2]) === height
  )
}
