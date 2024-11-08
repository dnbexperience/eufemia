import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '../../../..'
import nbNO from '../../../../constants/locales/nb-NO'
import Toolbar from '../../Toolbar'

const nb = nbNO['nb-NO']

describe('EditContainer', () => {
  it('should render default toolbar', () => {
    render(
      <Form.Section>
        <Form.Section.EditContainer>
          Edit Content
        </Form.Section.EditContainer>
      </Form.Section>
    )

    expect(document.querySelectorAll('button')).toHaveLength(2)
    expect(document.querySelectorAll('button')[0]).toHaveTextContent(
      nb.SectionEditContainer.doneButton
    )
    expect(document.querySelectorAll('button')[1]).toHaveTextContent(
      nb.SectionEditContainer.cancelButton
    )
  })

  it('should render custom toolbar', () => {
    render(
      <Form.Section>
        <Form.Section.EditContainer>
          Edit Content
          <Toolbar>no button</Toolbar>
        </Form.Section.EditContainer>
      </Form.Section>
    )

    expect(document.querySelectorAll('button')).toHaveLength(0)
  })
})
