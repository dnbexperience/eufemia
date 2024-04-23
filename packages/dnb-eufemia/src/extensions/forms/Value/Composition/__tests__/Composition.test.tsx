import React from 'react'
import { render } from '@testing-library/react'
import { Value } from '../../..'

describe('Value.Composition', () => {
  it('should render with correct class', () => {
    render(
      <Value.Composition>
        <Value.String value="foo" />
        <Value.String value="bar" />
      </Value.Composition>
    )

    const element = document.querySelector(
      '.dnb-forms-value-block__composition--horizontal'
    )

    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('SPAN')
  })

  it('should render with correct class when wrapped in SummaryList', () => {
    render(
      <Value.SummaryList>
        <Value.Composition label="Label">
          <Value.String value="foo" />
          <Value.String value="bar" />
        </Value.Composition>
      </Value.SummaryList>
    )

    const element = document.querySelector(
      '.dnb-forms-value-block__composition--horizontal'
    )

    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('DD')
  })

  // `"<span class="dnb-forms-value-block__content"><span class="dnb-forms-value-block dnb-span"><span class="dnb-forms-value-block__content">foo</span></span><span class="dnb-forms-value-block dnb-span"><span class="dnb-forms-value-block__content">bar</span></span></span>"`
})
