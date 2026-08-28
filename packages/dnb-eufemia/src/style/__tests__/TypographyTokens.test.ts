// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'

describe('Typography tokens', () => {
  it('corrects iOS typography without changing geometry tokens', () => {
    const completeCss = loadScss(require.resolve('../index.scss'))

    expect(completeCss).toContain('--font-size-basis: 1.125rem')
    expect(completeCss).toContain('--line-height-basis: 1.5rem')
    expect(completeCss).toContain(`
@supports (-webkit-touch-callout: none) {
  @supports (font: -apple-system-body) {
    :root {
      --font-size-xx-small: 0.7647058824rem;
      --font-size-x-small: 0.8235294118rem;
      --font-size-small: 0.9411764706rem;
      --font-size-basis: 1.0588235294rem;
      --font-size-medium: 1.1764705882rem;
      --font-size-large: 1.5294117647rem;
      --font-size-x-large: 2rem;
      --font-size-xx-large: 2.8235294118rem;
      --line-height-x-small: 1.1764705882rem;
      --line-height-small: 1.1764705882rem;
      --line-height-basis: 1.4117647059rem;
      --line-height-medium: 1.4117647059rem;
      --line-height-large: 1.8823529412rem;
      --line-height-x-large: 2.3529411765rem;
      --line-height-xx-large: 3.2941176471rem;
    }
  }
}`)
    expect(completeCss).toContain('--spacing-small: 1rem')
    expect(completeCss).toContain('--button-height: 2.5rem')
    expect(completeCss).toContain('--input-height: 2rem')
    expect(completeCss).toContain(
      '--responsive-font-size-basis: 0.9411764706rem'
    )
    expect(completeCss).toContain(
      '--responsive-line-height-basis: 1.1764705882rem'
    )
  })
})
