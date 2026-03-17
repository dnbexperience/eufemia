import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, Tools } from '../../..'
import ChildrenWithAge from '../ChildrenWithAge'
import { translations } from '../ChildrenWithAgeTranslations'
import type { GenerateRef } from '../../../Tools/ListAllProps'
import nbNO from '../../../constants/locales/nb-NO'
import { format } from '../../../../../components/number-format/NumberUtils'

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
    ).toHaveLength(5)

    expect(document.querySelector('input')).toHaveValue('1')

    expect(
      document.querySelectorAll('.dnb-forms-field-number__input')
    ).toHaveLength(2)

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

    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.hasChildren.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryAllByText(
        translationsNO.ChildrenWithAge.usesDaycare.fieldLabel
      )
    ).toHaveLength(1)
    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.hasJointResponsibility.fieldLabel
      )
    ).toBeInTheDocument()

    await userEvent.click(document.querySelectorAll('button')[5])
    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.dayCareExpenses.fieldLabel
      )
    ).toBeInTheDocument()

    await userEvent.click(document.querySelectorAll('button')[7])
    expect(
      screen.queryByText(
        translationsNO.ChildrenWithAge.jointResponsibilityExpenses
          .fieldLabel
      )
    ).toBeInTheDocument()
  })

  it('should render number of children with step controls', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const countChildrenFieldBlock = screen
      .queryByText(translationsNO.ChildrenWithAge.countChildren.fieldLabel)
      .closest('.dnb-forms-field-block') as HTMLElement

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

  it('should render a disabled increase button if 9 children', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const countChildrenFieldBlock = screen
      .queryByText(translationsNO.ChildrenWithAge.countChildren.fieldLabel)
      .closest('.dnb-forms-field-block') as HTMLElement

    const numOfChildrenInput = document.querySelectorAll(
      '.dnb-input__input'
    )[0]

    fireEvent.change(numOfChildrenInput, {
      target: {
        value: 9,
      },
    })
    expect(numOfChildrenInput).toHaveValue('9')

    expect(
      within(countChildrenFieldBlock).getByTitle('Øk (10)')
    ).toBeInTheDocument()
    expect(
      within(countChildrenFieldBlock).getByTitle('Øk (10)')
    ).toHaveProperty('disabled')
  })

  it('should render error message if more than 9 children', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    const numOfChildrenInput = document.querySelectorAll(
      '.dnb-input__input'
    )[0]

    fireEvent.change(numOfChildrenInput, {
      target: {
        value: 90,
      },
    })
    expect(numOfChildrenInput).toHaveValue('90')

    fireEvent.blur(numOfChildrenInput)

    const expectedText = nbNO['nb-NO'].NumberField.errorMaximum.replace(
      '{maximum}',
      String(format(9, { locale: 'nb-NO' }))
    )
    // Use regex to handle both regular and non-breaking spaces
    const expectedRegex = expectedText.replace(/\s/g, '\\s')
    expect(screen.getByRole('alert').textContent).toMatch(
      new RegExp(expectedRegex)
    )
  })

  it('should render age of child without step controls', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))
    await userEvent.type(document.querySelector('input'), '1')

    const childrenAgeFieldBlock = screen
      .queryByText(
        translationsNO.ChildrenWithAge.childrenAge.fieldLabel.replace(
          '{itemNo}',
          '1'
        )
      )
      .closest('.dnb-forms-field-block') as HTMLElement

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
    await userEvent.type(document.querySelector('input'), '1')

    const input = document.querySelectorAll('.dnb-input__input')[1]

    const value18 = '18'

    fireEvent.change(input, {
      target: {
        value: value18,
      },
    })
    expect(input).toHaveValue(value18)

    fireEvent.blur(input)

    const expectedText = nbNO['nb-NO'].NumberField.errorMaximum.replace(
      '{maximum}',
      String(format(17, { locale: 'nb-NO' }))
    )
    // Use regex to handle both regular and non-breaking spaces
    const expectedRegex = expectedText.replace(/\s/g, '\\s')
    expect(screen.getByRole('alert').textContent).toMatch(
      new RegExp(expectedRegex)
    )
  })

  it('should accept 0 as age of child', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))
    await userEvent.type(document.querySelector('input'), '1')

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

  it('should not accept values over 1000000 as joint-responsibility expense', async () => {
    render(
      <ChildrenWithAge
        enableAdditionalQuestions={['joint-responsibility']}
      />
    )

    await userEvent.click(document.querySelectorAll('button')[0])
    await userEvent.click(document.querySelectorAll('button')[4])
    await userEvent.type(document.querySelectorAll('input')[2], '10000001')

    const input = document.querySelectorAll('.dnb-input__input')[2]

    fireEvent.blur(input)

    const expectedText = nbNO['nb-NO'].NumberField.errorMaximum.replace(
      '{maximum}',
      String(format(1000000, { locale: 'nb-NO' }))
    )
    // Use regex to handle both regular and non-breaking spaces
    const expectedRegex = expectedText.replace(/\s/g, '\\s')
    expect(screen.getByRole('alert').textContent).toMatch(
      new RegExp(expectedRegex)
    )
  })

  it('should not accept values over 1000000 as daycare expense', async () => {
    render(<ChildrenWithAge enableAdditionalQuestions={['daycare']} />)

    await userEvent.click(document.querySelectorAll('button')[0])
    await userEvent.click(document.querySelectorAll('button')[5])
    await userEvent.type(document.querySelectorAll('input')[2], '10000001')

    const input = document.querySelectorAll('.dnb-input__input')[2]

    fireEvent.blur(input)

    const expectedText = nbNO['nb-NO'].NumberField.errorMaximum.replace(
      '{maximum}',
      String(format(1000000, { locale: 'nb-NO' }))
    )
    // Use regex to handle both regular and non-breaking spaces
    const expectedRegex = expectedText.replace(/\s/g, '\\s')
    expect(screen.getByRole('alert').textContent).toMatch(
      new RegExp(expectedRegex)
    )
  })

  it('should show summary with Nei when hasChildren changes to false', async () => {
    render(
      <Form.Handler>
        <ChildrenWithAge />
        <ChildrenWithAge mode="summary" />
      </Form.Handler>
    )

    const [yesButton, noButton] = Array.from(
      document.querySelectorAll('button')
    )

    await userEvent.click(noButton)

    expect(document.querySelectorAll('input')).toHaveLength(0)
    const dlDDs = Array.from(document.querySelectorAll('dl dd'))
    expect(dlDDs).toHaveLength(1)
    expect(dlDDs.at(0)).toHaveTextContent(nbNO['nb-NO'].BooleanField.no)

    await userEvent.click(yesButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('1')

    await waitFor(() => {
      const dlDDs = Array.from(document.querySelectorAll('dl dd'))
      expect(dlDDs).toHaveLength(3)
      expect(dlDDs.at(0)).toHaveTextContent(nbNO['nb-NO'].BooleanField.yes)
    })

    await userEvent.click(noButton)
    await waitFor(() => {
      expect(document.querySelectorAll('input')).toHaveLength(0)
    })

    // Here we check that the summary still shows Nei
    {
      const dlDDs = Array.from(document.querySelectorAll('dl dd'))
      expect(dlDDs).toHaveLength(1)
      expect(dlDDs.at(0)).toHaveTextContent(nbNO['nb-NO'].BooleanField.no)
    }

    await userEvent.click(yesButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('1')

    {
      const dlDDs = Array.from(document.querySelectorAll('dl dd'))
      expect(dlDDs).toHaveLength(3)
      expect(dlDDs.at(0)).toHaveTextContent(nbNO['nb-NO'].BooleanField.yes)
    }
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
      translations['nb-NO'].ChildrenWithAge.hasChildren.title
    )
  })

  it('should fallback to translations keys when locale has no ChildrenWithAge translations', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

    const translations = {
      'nn-NO': {},
    }

    render(
      <Form.Handler locale="nn-NO" translations={translations}>
        <ChildrenWithAge />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'ChildrenWithAge.hasChildren.title'
    )
    expect(document.querySelector('legend')).toHaveTextContent(
      'ChildrenWithAge.hasChildren.fieldLabel'
    )

    // Should have warned about missing translations
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.any(String), // Eufemia styling prefix
      expect.stringContaining(
        'Form.useTranslation: No translations found for locale "nn-NO"!'
      )
    )

    consoleSpy.mockRestore()
  })

  it('should render with correct props', () => {
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

    // Test essential properties without snapshots
    expect(propsOfFields['hasChildren']).toMatchObject({
      path: '/hasChildren',
      required: true,
      valueType: 'boolean',
      variant: 'buttons',
    })

    expect(propsOfFields['countChildren']).toMatchObject({
      path: '/countChildren',
      required: true,
      valueType: 'number',
      maximum: 9,
      minimum: 1,
    })

    expect(propsOfFields['children']).toMatchObject({
      path: '/children',
      required: false,
    })

    render(
      <Form.Handler defaultData={data}>
        <Tools.ListAllProps generateRef={generateRef}>
          <ChildrenWithAge mode="summary" />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    const { propsOfValues } = generateRef.current()

    // Test summary mode properties
    expect(propsOfValues).toHaveProperty('children')
    expect(propsOfValues).toHaveProperty('countChildren')
    expect(propsOfValues).toHaveProperty('hasChildren')
    expect(propsOfValues).toHaveProperty('daycareExpenses')
    expect(propsOfValues).toHaveProperty('hasJointResponsibility')
    expect(propsOfValues).toHaveProperty('jointResponsibilityExpenses')
    expect(propsOfValues).toHaveProperty('usesDaycare')
  })

  it('should run "reduceToVisibleFields" on submit in React.StrictMode', async () => {
    let submitData = null

    const defaultData = {
      hasChildren: true,
      countChildren: 1,
      children: [
        {
          age: 17,
        },
      ],
    }

    render(
      <React.StrictMode>
        <Form.Handler
          defaultData={defaultData}
          onSubmit={(data, { reduceToVisibleFields }) => {
            submitData = reduceToVisibleFields(data)
          }}
        >
          <ChildrenWithAge />
        </Form.Handler>
      </React.StrictMode>
    )

    const [, noButton] = Array.from(document.querySelectorAll('button'))

    const form = document.querySelector('form')

    await waitFor(() => {
      expect(screen.getByText('Alder på barn nr. 1')).toBeInTheDocument()
    })

    fireEvent.submit(form)
    expect(submitData).toEqual({
      hasChildren: true,
      countChildren: 1,
      children: [
        {
          age: 17,
        },
      ],
    })

    await userEvent.click(noButton)
    await waitFor(() => {
      expect(document.querySelectorAll('input')).toHaveLength(0)
    })

    fireEvent.submit(form)
    expect(submitData).toEqual({
      hasChildren: false,
    })
  })
})
