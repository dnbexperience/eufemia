import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, Tools } from '../../..'
import ChildrenWithAge from '../ChildrenWithAge'
import { translations } from '../ChildrenWithAgeTranslations'
import { GenerateRef } from '../../../Tools/ListAllProps'

describe('ChildrenWithAge', () => {
  it('should render correct fields', async () => {
    render(
      <Form.Handler>
        <ChildrenWithAge
          enableAdditionalQuestions={['daycare', 'joint-responsibility']}
        />
      </Form.Handler>
    )

    expect(document.querySelector('legend')).toHaveTextContent(
      translations['nb-NO'].ChildrenWithAge.hasChildren.fieldLabel
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
        translations['nb-NO'].ChildrenWithAge.hasChildren.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translations['nb-NO'].ChildrenWithAge.hasJointResponsibility
          .fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translations['nb-NO'].ChildrenWithAge.usesDaycare.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translations['nb-NO'].ChildrenWithAge.countChildren.fieldLabel
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        translations[
          'nb-NO'
        ].ChildrenWithAge.childrenAge.fieldLabel.replace('{itemNr}', '1')
      )
    ).toBeInTheDocument()
  })

  it('should render with step controls by default ', async () => {
    render(<ChildrenWithAge />)

    await userEvent.click(document.querySelector('button'))

    expect(screen.getByTitle('Reduser (0)')).toBeInTheDocument()
    expect(screen.getByTitle('Øk (2)')).toBeInTheDocument()
    expect(screen.getByTitle('Reduser (0)')).toBeInTheDocument()
    expect(screen.getByTitle('Øk (1)')).toBeInTheDocument()
  })

  it('should render without step controls ', async () => {
    render(<ChildrenWithAge hideStepControls />)

    await userEvent.click(document.querySelector('button'))

    expect(screen.queryByTitle('Reduser (0)')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Øk (2)')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Reduser (0)')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Øk (1)')).not.toBeInTheDocument()
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
