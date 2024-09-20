import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, Tools } from '../../..'
import ChildrenWithAge from '../ChildrenWithAge'
import { translations } from '../ChildrenWithAgeTranslations'
import { GenerateRef } from '../../../Tools/ListAllProps'
import nbNO from '../../../constants/locales/nb-NO'

describe('ChildrenWithAge', () => {
  const translationsNO = translations['nb-NO']

  it('should render correct fields', async () => {
    render(
      <Form.Handler>
        <ChildrenWithAge
          enableAdditionalQuestions={['daycare', 'joint-responsibility']}
        />
      </Form.Handler>
    )

    expect(document.querySelector('legend')).toHaveTextContent(
      translationsNO.ChildrenWithAge.hasChildren.fieldLabel
    )
    expect(
      document.querySelectorAll('.dnb-forms-field-block__grid')
    ).toHaveLength(1)

    await userEvent.click(document.querySelector('button'))

    const toggleButtons = Array.from(
      document.querySelectorAll('.dnb-toggle-button')
    )

    expect(toggleButtons.length).toBe(6)

    expect(
      document.querySelectorAll('.dnb-forms-field-block__grid')
    ).toHaveLength(6)

    expect(document.querySelector('input')).toHaveValue('1')

    await userEvent.type(document.querySelector('input'), '{Backspace}1')

    expect(
      document.querySelectorAll('.dnb-forms-field-number__input')
    ).toHaveLength(2)

    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.hasChildren.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.hasJointResponsibility.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.usesDaycare.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.countChildren.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translations[
          'nb-NO'
        ].ChildrenWithAge.childrenAge.fieldLabel.replace('{itemNo}', '1')
      )
    ).toBeInTheDocument()
  })

  it('should render number of children with step controls', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const countChildrenFieldBlock = screen.queryByText(
      translationsNO.ChildrenWithAge.countChildren.fieldLabel
    ).parentElement.parentElement.parentElement

    expect(
      within(countChildrenFieldBlock).getByTitle('Reduser (0)')
    ).toBeInTheDocument()
    expect(
      within(countChildrenFieldBlock).getByTitle('Øk (2)')
    ).toBeInTheDocument()
    expect(
      document.querySelectorAll('.dnb-input__input')[0]
    ).toHaveAttribute('inputmode', 'numeric')
  })

  it('should render age of child without step controls', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const childrenAgeFieldBlock = screen.queryByText(
      translationsNO.ChildrenWithAge.childrenAge.fieldLabel.replace(
        '{itemNo}',
        '1'
      )
    ).parentElement.parentElement.parentElement

    expect(
      within(childrenAgeFieldBlock).queryByRole('Reduser')
    ).not.toBeInTheDocument()

    expect(
      document.querySelectorAll('.dnb-input__input')[1]
    ).toHaveAttribute('inputmode', 'numeric')
  })

  it('should display error if age of child is older than 17 years', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const input = document.querySelectorAll('.dnb-input__input')[1]

    const value18 = '18'

    fireEvent.change(input, {
      target: {
        value: value18,
      },
    })
    expect(input).toHaveValue(value18)

    fireEvent.blur(input)

    expect(screen.getByRole('alert')).toHaveTextContent(
      nbNO['nb-NO'].NumberField.errorMaximum.replace('{maximum}', '17')
    )
  })

  it('should accept 0 as age of child', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const input = document.querySelectorAll('.dnb-input__input')[1]

    const value0 = '0'

    fireEvent.change(input, {
      target: {
        value: value0,
      },
    })
    expect(input).toHaveValue(value0)

    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should reset age when hasChildren changes to false', async () => {
    render(<ChildrenWithAge />)

    const [yesButton, noButton] = Array.from(
      document.querySelectorAll('button')
    )

    expect(
      document.querySelector('.dnb-input__input')
    ).not.toBeInTheDocument()

    await userEvent.click(yesButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('1')

    await userEvent.click(noButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('0')

    await userEvent.click(yesButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('0')
  })

  it('should replace translations', async () => {
    const myTranslations = {
      'en-GB': {
        ChildrenWithAge: { hasChildren: { title: 'Custom title' } },
      },
    }

    render(
      <Form.Handler translations={myTranslations} locale="en-GB">
        <ChildrenWithAge />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'Custom title'
    )
    expect(document.querySelector('legend')).toHaveTextContent(
      translations['en-GB'].ChildrenWithAge.hasChildren.fieldLabel
    )
  })

  it('should display default translations when providing a non-existent locale to Form.Handler', () => {
    render(
      <Form.Handler locale="non-existent">
        <ChildrenWithAge />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'Antall barn'
    )
  })

  it('should match snapshot', () => {
    const generateRef = React.createRef<GenerateRef>()

    const data = {
      hasChildren: true,
      countChildren: 2,
      hasJointResponsibility: true,
      usesDaycare: true,
      children: [
        {
          age: 18,
          daycare: true,
          usesDaycare: true,
        },
      ],
    }

    render(
      <Form.Handler defaultData={data}>
        <Tools.ListAllProps generateRef={generateRef}>
          <ChildrenWithAge />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    const { propsOfFields } = generateRef.current()
    expect(propsOfFields).toMatchSnapshot()

    render(
      <Form.Handler defaultData={data}>
        <Tools.ListAllProps generateRef={generateRef}>
          <ChildrenWithAge mode="summary" />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    const { propsOfValues } = generateRef.current()
    expect(propsOfValues).toMatchSnapshot()
  })
})
