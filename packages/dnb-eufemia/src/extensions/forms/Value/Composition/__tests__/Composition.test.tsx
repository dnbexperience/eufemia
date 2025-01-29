import React from 'react'
import { render } from '@testing-library/react'
import { Value } from '../../..'
import { axeComponent } from '../../../../../core/jest/jestSetup'

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

    expect(element.tagName).toBe('SPAN')
  })

  it('should not have max-width by default', () => {
    render(
      <Value.Composition>
        <Value.String value="foo" />
        <Value.String value="bar" />
      </Value.Composition>
    )

    const element = document.querySelector(
      '.dnb-forms-value-block__composition--horizontal'
    )

    expect(element).not.toHaveClass(
      'dnb-forms-value-block--max-width-large'
    )
  })

  it('should set max-width', () => {
    render(
      <Value.Composition maxWidth="medium">
        <Value.String value="foo" />
        <Value.String value="bar" />
      </Value.Composition>
    )

    const element = document.querySelector(
      '.dnb-forms-value-block__composition--horizontal'
    )

    expect(element).toHaveClass('dnb-forms-value-block--max-width-medium')
  })

  it('should have gap by default', () => {
    render(
      <Value.Composition>
        <Value.String value="foo" />
        <Value.String value="bar" />
      </Value.Composition>
    )

    const element = document.querySelector(
      '.dnb-forms-value-block__composition--horizontal .dnb-forms-value-block__content'
    )

    expect(element).toHaveClass(
      'dnb-forms-value-block__content--gap-xx-small'
    )
  })

  it('should set gap', () => {
    render(
      <Value.Composition gap="medium">
        <Value.String value="foo" />
        <Value.String value="bar" />
      </Value.Composition>
    )

    const element = document.querySelector(
      '.dnb-forms-value-block__composition--horizontal .dnb-forms-value-block__content'
    )

    expect(element).toHaveClass(
      'dnb-forms-value-block__content--gap-medium'
    )
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

    expect(element.tagName).toBe('DD')
  })

  describe('should validate with ARIA rules', () => {
    it('when used without SummaryList', async () => {
      const log = jest.spyOn(console, 'log').mockImplementation()

      const Comp = render(
        <>
          <Value.String
            label="With a long label"
            value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
          />

          <Value.Composition>
            <Value.String
              label="With a long label"
              value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
            />
            <Value.String label="Label" value="second value" />
          </Value.Composition>

          <Value.Composition maxWidth="large">
            <Value.String
              label="With a long label"
              value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
            />
            <Value.String label="Label" value="second value" />
          </Value.Composition>
        </>
      )

      expect(await axeComponent(Comp)).toHaveNoViolations()

      log.mockRestore()
    })

    it('when wrapped in SummaryList', async () => {
      const Comp = render(
        <Value.SummaryList>
          <Value.String label="Basic" value="value" />

          <Value.Composition>
            <Value.String label="First" value="value" />
            <Value.String label="Second" value="value" />
          </Value.Composition>

          <Value.Composition label="Composition Label">
            <Value.String value="But without a value" />
            <Value.String value="label" />
          </Value.Composition>

          <Value.Composition label="Composition Label">
            <Value.String label="First" value="value" />
            <Value.String label="Second" value="value" />
          </Value.Composition>

          <Value.Composition>
            <Value.String value="With" />
            <Value.String value="only a" />
            <Value.String value="value" />
          </Value.Composition>
        </Value.SummaryList>
      )

      expect(await axeComponent(Comp)).toHaveNoViolations()
    })

    it('when wrapped in SummaryList with grid layout', async () => {
      const Comp = render(
        <Value.SummaryList layout="grid">
          <Value.String label="Basic" value="value" />

          <Value.Composition label="Composition Label">
            <Value.String label="First" value="value" />
            <Value.String label="Second" value="value" />
          </Value.Composition>

          <Value.Composition label="Composition Label">
            <Value.String value="But without a value" />
            <Value.String value="label" />
          </Value.Composition>

          <Value.Composition label="Composition Label">
            <Value.String label="First" value="value" />
            <Value.String label="Second" value="value" />
          </Value.Composition>

          <Value.Composition>
            <Value.String value="With" />
            <Value.String value="only a" />
            <Value.String value="value" />
          </Value.Composition>
        </Value.SummaryList>
      )

      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })

  it('renders the label with a strong element', () => {
    render(
      <Value.SummaryList>
        <Value.Composition label="Label">
          <Value.String value="Value" />
        </Value.Composition>
      </Value.SummaryList>
    )

    expect(
      document.querySelector('.dnb-forms-value-block__label strong')
    ).toBeInTheDocument()
  })

  describe('transformLabel', () => {
    it('renders labels', async () => {
      render(
        <Value.Composition
          label="Label"
          transformLabel={(label: string) => label.toUpperCase()}
        >
          <Value.String path="/foo" />
          <Value.String path="/bar" />
        </Value.Composition>
      )

      const label = document.querySelector('.dnb-form-label')

      expect(label.textContent).toBe('LABEL')
    })
  })
})
