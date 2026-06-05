import { render } from '@testing-library/react'
import AutoTranslate from '../AutoTranslate'
import Provider from '../Provider'
import Dropdown from '../../components/dropdown/Dropdown'

describe('AutoTranslate', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should set translate="no" on portal content via PortalRoot.Provider', () => {
    render(
      <AutoTranslate off>
        <Dropdown data={['Item 1', 'Item 2']} open />
      </AutoTranslate>
    )

    const portalElement = document.getElementById('eufemia-portal-root')
    const portalWrapper = portalElement?.querySelector(
      '.eufemia-portal-root'
    )
    expect(portalWrapper).toHaveAttribute('translate', 'no')
  })

  it('should set translate="no" on form element via formElement context', () => {
    render(
      <AutoTranslate off>
        <Dropdown data={['Item 1', 'Item 2']} />
      </AutoTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).toHaveAttribute('translate', 'no')
  })

  it('should not set translate when off is not provided', () => {
    render(
      <AutoTranslate>
        <Dropdown data={['Item 1', 'Item 2']} />
      </AutoTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).not.toHaveAttribute('translate')
  })

  it('should not set translate when off is false', () => {
    render(
      <AutoTranslate off={false}>
        <Dropdown data={['Item 1', 'Item 2']} />
      </AutoTranslate>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).not.toHaveAttribute('translate')
  })

  it('should allow nesting inside an existing Provider', () => {
    render(
      <Provider locale="en-GB">
        <AutoTranslate off>
          <Dropdown data={['Item 1', 'Item 2']} />
        </AutoTranslate>
      </Provider>
    )

    const trigger = document.querySelector('.dnb-dropdown__trigger')
    expect(trigger).toHaveAttribute('translate', 'no')
  })
})
