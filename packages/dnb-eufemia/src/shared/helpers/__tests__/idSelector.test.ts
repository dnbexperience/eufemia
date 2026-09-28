import idSelector from '../idSelector'

describe('idSelector', () => {
  it('should match an id that is a valid CSS identifier', () => {
    document.body.innerHTML = '<div id="id-r1"></div>'

    expect(document.querySelector(idSelector('id-r1'))).toBeInTheDocument()
  })

  it.each(['my.id', ':r1:', '«r1»', 'my id', 'a"b', 'a\\b'])(
    'should match "%s", which is not a valid CSS identifier',
    (id) => {
      const element = document.createElement('div')
      element.id = id
      document.body.append(element)

      expect(document.querySelector(idSelector(id))).toBe(element)
    }
  )

  it('should not match another element', () => {
    document.body.innerHTML = '<div id="a"></div><div id="b"></div>'

    expect(document.querySelectorAll(idSelector('a'))).toHaveLength(1)
  })
})
