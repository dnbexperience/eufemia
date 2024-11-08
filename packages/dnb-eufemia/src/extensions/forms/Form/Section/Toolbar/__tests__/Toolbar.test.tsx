import React from 'react'
import { render } from '@testing-library/react'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../Toolbar'
import EditButton from '../../ViewContainer/EditButton'
import nbNO from '../../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].SectionViewContainer

describe('Toolbar', () => {
  it('supports spacing props', () => {
    render(
      <SectionContainerContext.Provider value={{}}>
        <Toolbar top="large">content</Toolbar>
      </SectionContainerContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-section-toolbar')
    ).toHaveClass('dnb-space__top--large')
  })

  it('has buttons/tools by default', () => {
    render(
      <SectionContainerContext.Provider value={{}}>
        <Toolbar />
      </SectionContainerContext.Provider>
    )

    expect(document.querySelector('button')).not.toBeInTheDocument()
  })

  it('has hr element', () => {
    render(
      <SectionContainerContext.Provider value={{}}>
        <Toolbar />
      </SectionContainerContext.Provider>
    )

    expect(document.querySelector('hr')).toBeInTheDocument()
  })

  it('has render given children', () => {
    render(
      <SectionContainerContext.Provider value={{}}>
        <Toolbar>
          <EditButton />
        </Toolbar>
      </SectionContainerContext.Provider>
    )

    const buttons = document.querySelectorAll('button')

    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent(nb.editButton)
  })
})
