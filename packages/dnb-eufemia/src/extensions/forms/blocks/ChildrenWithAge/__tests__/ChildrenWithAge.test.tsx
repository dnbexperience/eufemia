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
    ).toHaveLength(2)
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
    await userEvent.type(document.querySelector('input'), '1')

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

    expect(screen.getByRole('alert')).toHaveTextContent(
      nbNO['nb-NO'].NumberField.errorMaximum.replace('{maximum}', '17')
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

    expect(screen.getByRole('alert')).toHaveTextContent(
      nbNO['nb-NO'].NumberField.errorMaximum.replace(
        '{maximum}',
        '1000000'
      )
    )
  })

  it('should not accept values over 1000000 as daycare expense', async () => {
    render(<ChildrenWithAge enableAdditionalQuestions={['daycare']} />)

    await userEvent.click(document.querySelectorAll('button')[0])
    await userEvent.click(document.querySelectorAll('button')[5])
    await userEvent.type(document.querySelectorAll('input')[2], '10000001')

    const input = document.querySelectorAll('.dnb-input__input')[2]

    fireEvent.blur(input)

    expect(screen.getByRole('alert')).toHaveTextContent(
      nbNO['nb-NO'].NumberField.errorMaximum.replace(
        '{maximum}',
        '1000000'
      )
    )

    expect(screen.getByRole('alert')).toHaveTextContent(
      nbNO['nb-NO'].NumberField.errorMaximum.replace(
        '{maximum}',
        '1000000'
      )
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
    expect(dlDDs.at(0)).toHaveTextContent('Nei')

    await userEvent.click(yesButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('1')

    await waitFor(() => {
      const dlDDs = Array.from(document.querySelectorAll('dl dd'))
      expect(dlDDs).toHaveLength(3)
      expect(dlDDs.at(0)).toHaveTextContent('Ja')
    })

    await userEvent.click(noButton)
    await waitFor(() => {
      expect(document.querySelectorAll('input')).toHaveLength(0)
    })

    // Here we check that the summary still shows Nei
    {
      const dlDDs = Array.from(document.querySelectorAll('dl dd'))
      expect(dlDDs).toHaveLength(1)
      expect(dlDDs.at(0)).toHaveTextContent('Nei')
    }

    await userEvent.click(yesButton)
    expect(document.querySelector('.dnb-input__input')).toHaveValue('1')

    {
      const dlDDs = Array.from(document.querySelectorAll('dl dd'))
      expect(dlDDs).toHaveLength(3)
      expect(dlDDs.at(0)).toHaveTextContent('Ja')
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
