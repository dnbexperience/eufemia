import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Input } from '../../../../components'
import FieldBlock from '../FieldBlock'
import userEvent from '@testing-library/user-event'
import { useFieldProps } from '../../hooks'
import {
  initializeTestSetup,
  runAnimation,
  simulateAnimationEnd,
} from '../../../../components/height-animation/__tests__/HeightAnimationUtils'
import { Field, Form } from '../..'
import nbNO from '../../constants/locales/nb-NO'
import enGB from '../../constants/locales/en-GB'

const nb = nbNO['nb-NO']
const en = enGB['en-GB']

describe('FieldBlock', () => {
  it('should forward HTML attributes', () => {
    render(<FieldBlock id="custom-id">content</FieldBlock>)

    const element = document.querySelector('.dnb-forms-field-block')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('id')
    expect(element.getAttribute('id')).toBe('custom-id')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <FieldBlock top="large">content</FieldBlock>
    )

    const element = document.querySelector('.dnb-forms-field-block')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<FieldBlock space={{ top: 'x-large' }}>content</FieldBlock>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should support disabled prop', () => {
    const { rerender } = render(
      <FieldBlock label="Disabled label" disabled>
        content
      </FieldBlock>
    )

    const labelElement = () => document.querySelector('label')

    expect(labelElement()).toHaveAttribute('disabled')

    rerender(<FieldBlock label="Disabled label">content</FieldBlock>)

    expect(labelElement()).not.toHaveAttribute('disabled')
  })

  it('should support heading size prop', () => {
    const { rerender } = render(
      <FieldBlock label="Label" labelSize="medium">
        content
      </FieldBlock>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--medium'
    )

    rerender(
      <FieldBlock label="Label" labelSize="large">
        content
      </FieldBlock>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--large'
    )
  })

  it('should contain given classes', () => {
    render(<FieldBlock className="custom-class">content</FieldBlock>)

    expect(
      Array.from(
        document.querySelector('.dnb-forms-field-block').classList
      )
    ).toEqual(['dnb-space', 'dnb-forms-field-block', 'custom-class'])

    expect(
      Array.from(
        document.querySelector('.dnb-forms-field-block__grid').classList
      )
    ).toEqual([
      'dnb-forms-field-block__grid',
      'dnb-forms-field-block--layout-vertical',
    ])
  })

  it('should support "forId" property', () => {
    render(
      <FieldBlock forId="unique" label="A Label">
        <input type="text" id="unique" />
      </FieldBlock>
    )

    const element = document.querySelector('.dnb-forms-field-block')
    const labelElement = element.querySelector('label')
    const inputElement = element.querySelector('input')

    expect(labelElement.getAttribute('for')).toBe('unique')
    expect(labelElement.getAttribute('for')).toBe(
      inputElement.getAttribute('id')
    )
  })

  it('should render a "label"', () => {
    render(<FieldBlock label="A Label">content</FieldBlock>)

    const labelElement = document.querySelector('label')

    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveTextContent('A Label')
  })

  describe('labelDescription', () => {
    it('should render with a string', () => {
      render(
        <FieldBlock labelDescription="A Label Description">
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveClass(
        'dnb-form-label dnb-space__right--small dnb-space__top--zero dnb-space__bottom--x-small'
      )
      expect(labelElement).toHaveTextContent('A Label Description')
    })

    it('should render with JSX content', () => {
      render(
        <FieldBlock labelDescription={<span>A Label Description</span>}>
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveClass(
        'dnb-form-label dnb-space__right--small dnb-space__top--zero dnb-space__bottom--x-small'
      )
      expect(labelElement).toHaveTextContent('A Label Description')
    })

    it('should render with a React element', () => {
      const LabelDescription = () => <span>A Label Description</span>

      render(
        <FieldBlock labelDescription={<LabelDescription />}>
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveClass(
        'dnb-form-label dnb-space__right--small dnb-space__top--zero dnb-space__bottom--x-small'
      )
      expect(labelElement).toHaveTextContent('A Label Description')
    })

    it('should not render when empty fragment is given', () => {
      render(<FieldBlock labelDescription={<></>}>content</FieldBlock>)

      expect(
        document.querySelector('.dnb-forms-field-block__label-description')
      ).toBeNull()

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveClass(
        'dnb-form-label dnb-space__right--small dnb-space__top--zero dnb-space__bottom--x-small'
      )
      expect(labelElement).toHaveTextContent('')
    })
  })

  describe('labelSuffix', () => {
    it('should add additional text to the label with a non-breaking space', () => {
      render(
        <FieldBlock label="A Label" labelSuffix="(valgfritt)">
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent(
        `A Label ${nb.Field.optionalLabelSuffix}`
      )
      expect(
        labelElement.querySelector('span > span').innerHTML
      ).toContain(`A Label&nbsp;(valgfritt)`)
    })

    it('should add additional text to the label with a non-breaking space when label and labelSuffix is a JSX element', () => {
      render(
        <FieldBlock
          label={<b>A Label</b>}
          labelSuffix={<i>(valgfritt)</i>}
        >
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent(
        `A Label ${nb.Field.optionalLabelSuffix}`
      )
      expect(labelElement.querySelector('span').innerHTML).toContain(
        `<b>A Label</b>&nbsp;<i>(valgfritt)</i>`
      )
    })
  })

  describe('required={false}', () => {
    it('should add (optional) text to the label', () => {
      render(
        <FieldBlock label="A Label" required={false}>
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent(
        `A Label ${nb.Field.optionalLabelSuffix}`
      )
    })

    it('should prioritize labelSuffix over optionalLabel', () => {
      render(
        <FieldBlock
          label="A Label"
          required={false}
          labelSuffix="(suffix)"
        >
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')
      expect(labelElement.textContent).toBe('A Label (suffix)')
    })

    it('should check if labelSuffix already exists in label', () => {
      render(
        <FieldBlock
          label={`My Label ${nb.Field.optionalLabelSuffix}`}
          required={false}
        >
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')
      expect(labelElement.textContent).toBe(
        `My Label ${nb.Field.optionalLabelSuffix}`
      )
    })

    it('should support en-GB locale', () => {
      render(
        <Form.Handler locale="en-GB">
          <FieldBlock label="A Label" required={false}>
            content
          </FieldBlock>
        </Form.Handler>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent(
        `A Label ${en.Field.optionalLabelSuffix}`
      )
    })

    it('should add (optional) text when label is a JSX element', () => {
      render(
        <FieldBlock label={<b>A Label</b>} required={false}>
          content
        </FieldBlock>
      )

      const labelElement = document.querySelector('label')

      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent(
        `A Label ${nb.Field.optionalLabelSuffix}`
      )
      expect(labelElement.querySelector('span').innerHTML).toContain(
        `<b>A Label</b>&nbsp;(valgfritt)`
      )
    })
  })

  it('click on label should set focus on input after value change', async () => {
    const MockComponent = () => {
      const fromInput = React.useCallback(({ value }) => value, [])
      const { value, handleChange } = useFieldProps({
        value: '',
        fromInput,
      })

      return (
        <FieldBlock label="Label" forId="unique">
          <Input id="unique" value={value} on_change={handleChange} />
        </FieldBlock>
      )
    }

    render(<MockComponent />)

    const label = document.querySelector('label')
    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    await userEvent.click(label)

    await waitFor(() => {
      expect(input).toHaveFocus()
    })
  })

  it('should not use fieldset/legend elements when no label is given', () => {
    render(
      <FieldBlock>
        <div>
          <span>no label</span>
          <Input label="Label" />
          <FieldBlock label="Label">
            <div>
              <span>no label</span>
              <Input label="Label" />
              <span>no label</span>
            </div>
          </FieldBlock>
          <span>no label</span>
        </div>
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
  })

  it('should use fieldset/legend elements when nested component has a label property', () => {
    render(
      <FieldBlock label="Legend">
        <div>
          <span>no label</span>
          <Input label="Label" />
          <FieldBlock label="Label">
            <div>
              <span>no label</span>
              <Input label="Label" />
              <span>no label</span>
            </div>
          </FieldBlock>
          <span>no label</span>
        </div>
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('.dnb-forms-field-block').tagName).toBe(
      'FIELDSET'
    )

    const labelElements = document.querySelectorAll('.dnb-form-label')
    expect(labelElements[0].tagName).toBe('LEGEND')
    expect(labelElements[1].tagName).toBe('LABEL')
    expect(labelElements[2].tagName).toBe('LABEL')
    expect(labelElements[3].tagName).toBe('LABEL')
    expect(labelElements[4]).toBe(undefined)
  })

  it('should use fieldset/legend elements when several components have a label property', () => {
    const { rerender } = render(
      <FieldBlock label="Legend">
        <MockComponent label="Label" />
        <MockComponent label="Label" />
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('legend')).not.toHaveAttribute('for')
    expect(document.querySelectorAll('label')).toHaveLength(2)

    rerender(
      <FieldBlock label="Legend" forId="unique">
        <MockComponent label="Label" />
        <MockComponent id="unique" />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(2)

    rerender(
      <FieldBlock label="Legend">
        <MockComponent />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(1)
  })

  it('should use fieldset/legend when _formElement is given', () => {
    MockComponent._formElement = true

    const { rerender } = render(
      <FieldBlock label="Legend">
        <MockComponent />
        <MockComponent />
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('legend')).not.toHaveAttribute('for')

    delete MockComponent._formElement

    rerender(
      <FieldBlock label="Legend">
        <MockComponent />
        <MockComponent />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(1)
  })

  it('should use fieldset/legend when "asFieldset" is given', () => {
    render(
      <FieldBlock label="Legend" asFieldset>
        content
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('legend')).not.toHaveAttribute('for')
    expect(document.querySelector('.dnb-forms-field-block').tagName).toBe(
      'FIELDSET'
    )
  })

  it('should support "layout" property', () => {
    render(<FieldBlock layout="horizontal">content</FieldBlock>)

    const element = document.querySelector('.dnb-forms-field-block__grid')

    expect(element.classList).toContain(
      'dnb-forms-field-block--layout-horizontal'
    )
    expect(element.classList).not.toContain(
      'dnb-forms-field-block--layout-vertical'
    )
  })

  it('should support "width" property', () => {
    const { rerender } = render(
      <FieldBlock width="medium">content</FieldBlock>
    )

    const element = document.querySelector('.dnb-forms-field-block')

    expect(element.classList).toContain(
      'dnb-forms-field-block--width-medium'
    )

    rerender(<FieldBlock width="large">content</FieldBlock>)

    expect(element.classList).toContain(
      'dnb-forms-field-block--width-large'
    )
  })

  it('should support "contentWidth" property', () => {
    const { rerender } = render(
      <FieldBlock contentWidth="medium">content</FieldBlock>
    )

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )

    expect(element.classList).toContain(
      'dnb-forms-field-block__contents--width-medium'
    )

    rerender(<FieldBlock contentWidth="large">content</FieldBlock>)

    expect(element.classList).toContain(
      'dnb-forms-field-block__contents--width-large'
    )
  })

  it('should support custom "width"', () => {
    render(<FieldBlock width="4rem">content</FieldBlock>)

    const element = document.querySelector('.dnb-forms-field-block')

    expect(element.classList).toContain(
      'dnb-forms-field-block--width-custom'
    )
    expect(element).toHaveStyle('--dnb-forms-field-block-width: 4rem;')
  })

  it('should support custom "contentWidth"', () => {
    render(<FieldBlock contentWidth="4rem">content</FieldBlock>)

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )

    expect(element.classList).toContain(
      'dnb-forms-field-block__contents--width-custom'
    )
    expect(element).toHaveStyle(
      '--dnb-forms-field-block-content-width: 4rem;'
    )
  })

  it('should support "contentClassName" property', () => {
    render(
      <FieldBlock contentClassName="custom-class">content</FieldBlock>
    )

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )

    expect(element.classList).toContain('custom-class')
  })

  it('should set hasError on provider', () => {
    let hasNestedError = false
    const MockComponent = (props) => {
      const { hasError } = useFieldProps(props)
      hasNestedError = hasError
      return null
    }

    const { rerender } = render(
      <FieldBlock error={new Error('FieldBlock error')}>
        <MockComponent />
      </FieldBlock>
    )

    expect(hasNestedError).toBeTruthy()

    rerender(
      <FieldBlock>
        <MockComponent />
      </FieldBlock>
    )

    expect(hasNestedError).toBeFalsy()
  })

  describe('FieldBlock with status', () => {
    const blockError = 'FieldBlock error'
    const blockWarning = 'FieldBlock warning'
    const blockInfo = 'FieldBlock info'
    const firstError = 'First error'

    describe('info prop', () => {
      it('should render a FormStatus correctly', () => {
        render(<FieldBlock info={blockInfo}>content</FieldBlock>)

        const element = document.querySelector('.dnb-form-status')

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('dnb-form-status--info')
        expect(element).toHaveClass('dnb-height-animation--is-visible')
        expect(element).toHaveTextContent(blockInfo)
      })
    })

    describe('warning prop', () => {
      it('should render a FormStatus correctly', () => {
        render(<FieldBlock warning={blockWarning}>content</FieldBlock>)

        const element = document.querySelector('.dnb-form-status')

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('dnb-form-status--warn')
        expect(element).toHaveClass('dnb-height-animation--is-visible')
        expect(element).toHaveTextContent(blockWarning)
      })
    })

    describe('error prop', () => {
      it('should render a FormStatus correctly', () => {
        render(
          <FieldBlock error={new Error(blockError)}>content</FieldBlock>
        )

        const element = document.querySelector('.dnb-form-status')

        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('dnb-form-status--error')
        expect(element).toHaveClass('dnb-height-animation--is-visible')
        expect(element).toHaveTextContent(blockError)
      })
    })

    describe('FormStatus with animation', () => {
      initializeTestSetup()

      beforeEach(() => {
        process.env.NODE_ENV = 'development'
      })

      it('should have enabled animation', () => {
        const { rerender } = render(<FieldBlock>content</FieldBlock>)

        rerender(
          <FieldBlock error={new Error(blockError)}>content</FieldBlock>
        )

        const element = document.querySelector('.dnb-form-status')

        expect(element).toHaveClass('dnb-height-animation--animating')

        runAnimation()

        expect(element).not.toHaveClass('dnb-height-animation--animating')
      })

      it('should animate on show and hide the message', () => {
        const { rerender } = render(<FieldBlock>content</FieldBlock>)

        rerender(
          <FieldBlock error={new Error(blockError)}>content</FieldBlock>
        )

        const element = document.querySelector('.dnb-form-status')

        expect(element).toHaveClass('dnb-height-animation--animating')

        simulateAnimationEnd()

        expect(element).not.toHaveClass('dnb-height-animation--animating')

        rerender(<FieldBlock>content</FieldBlock>)

        expect(element).toHaveClass('dnb-height-animation--animating')

        simulateAnimationEnd()

        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      it('should disable animation when process.env.NODE_ENV is test', () => {
        process.env.NODE_ENV = 'test'

        const { rerender } = render(<FieldBlock>content</FieldBlock>)

        rerender(
          <FieldBlock error={new Error(blockError)}>content</FieldBlock>
        )

        const element = document.querySelector('.dnb-form-status')

        expect(element).not.toHaveClass('dnb-height-animation--animating')
      })

      it('should disable animation when globalThis.IS_TEST is true', () => {
        globalThis.IS_TEST = true

        const { rerender } = render(<FieldBlock>content</FieldBlock>)

        rerender(
          <FieldBlock error={new Error(blockError)}>content</FieldBlock>
        )

        const element = document.querySelector('.dnb-form-status')

        expect(element).not.toHaveClass('dnb-height-animation--animating')
      })
    })

    it('should use given id for aria-describedby and else forId', () => {
      const { rerender } = render(
        <FieldBlock id="unique" error={new Error(firstError)}>
          content
        </FieldBlock>
      )

      const status = document.querySelector('.dnb-form-status')
      expect(status).toHaveAttribute('id', 'unique-form-status--error')

      rerender(
        <FieldBlock forId="forId" error={new Error(firstError)}>
          content
        </FieldBlock>
      )

      expect(status).toHaveAttribute('id', 'forId-form-status--error')

      rerender(
        <FieldBlock
          id="unique"
          forId="forId"
          error={new Error(firstError)}
        >
          content
        </FieldBlock>
      )

      expect(status).toHaveAttribute('id', 'unique-form-status--error')
    })
  })

  it('should warn when formStatus is given, but no label', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    const asyncValidator = async () => {
      return null
    }

    const { rerender } = render(
      <Form.Handler>
        <Field.String
          label="Has a label"
          value="bar"
          path="/foo"
          validator={asyncValidator}
        />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')

    await userEvent.click(buttonElement)

    expect(log).toHaveBeenCalledTimes(0)

    rerender(
      <Form.Handler>
        <Field.String value="bar" path="/foo" validator={asyncValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.click(buttonElement)

    expect(log).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.any(String),
      'Provide a label when using an async validator or onChange event.'
    )

    log.mockRestore()
  })
})

function MockComponent({ label = null, id = null }) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} />
    </>
  )
}
MockComponent._formElement = null
