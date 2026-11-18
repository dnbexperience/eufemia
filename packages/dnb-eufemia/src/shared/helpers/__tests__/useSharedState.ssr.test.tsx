// @vitest-environment node

import { renderToString } from 'react-dom/server'
import {
  createReferenceKey,
  createSharedState,
  useSharedState,
} from '../useSharedState'
import SharedProvider from '../../Provider'
import Accordion from '../../../components/accordion/Accordion'
import Tabs from '../../../components/tabs/Tabs'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../../../components/help-button/HelpButtonInline'
import { Field, Form } from '../../../extensions/forms'

function Writer({ id }: { id: string }) {
  const { data } = useSharedState<{ value: string }>(id, {
    value: 'Request A',
  })
  return <output>{data?.value}</output>
}

function Reader({ id }: { id: string }) {
  const { data } = useSharedState<{ value: string }>(id)
  return <output>{data?.value ?? 'empty'}</output>
}

const tabs = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
]

describe('useSharedState during server rendering', () => {
  it('should not keep the data of a render in the process-wide store', () => {
    renderToString(<Writer id="ssr-kept" />)

    expect(createSharedState('ssr-kept').get()).toBeUndefined()
  })

  it('should not share data between renders without a Provider', () => {
    renderToString(<Writer id="ssr-between" />)
    const html = renderToString(<Reader id="ssr-between" />)

    expect(html).toBe('<output>empty</output>')
  })

  it('should share data between components inside the same Provider', () => {
    const html = renderToString(
      <SharedProvider>
        <Writer id="ssr-provider" />
        <Reader id="ssr-provider" />
      </SharedProvider>
    )

    expect(html).toBe(
      '<output>Request A</output><output>Request A</output>'
    )
  })

  describe('Accordion', () => {
    it('should not open an accordion that an earlier render opened', () => {
      const first = renderToString(
        <Accordion
          variant="tertiary"
          id="ssr-accordion"
          title="Title"
          expanded
        >
          Content
        </Accordion>
      )
      const second = renderToString(
        <Accordion variant="tertiary" id="ssr-accordion" title="Title">
          Content
        </Accordion>
      )

      expect(first).toContain('aria-expanded="true"')
      expect(second).toContain('aria-expanded="false"')
      expect(second).not.toContain('aria-expanded="true"')
    })

    it('should show connected content inside the same Provider', () => {
      const html = renderToString(
        <SharedProvider>
          <Accordion
            variant="tertiary"
            id="ssr-accordion-connected"
            title="Title"
            expanded
          />
          <Accordion.Content connectedTo="ssr-accordion-connected">
            Connected content
          </Accordion.Content>
        </SharedProvider>
      )

      expect(html).toContain('Connected content')
    })
  })

  describe('HelpButtonInline', () => {
    it('should not open help that an earlier render opened', () => {
      // Like FieldBlock, give both the same help props
      const render = (open?: boolean) =>
        renderToString(
          <>
            <HelpButtonInline
              contentId="ssr-help"
              help={{ title: 'Title', content: 'Help content', open }}
            />
            <HelpButtonInlineContent
              contentId="ssr-help"
              help={{ title: 'Title', content: 'Help content', open }}
            />
          </>
        )

      const first = render(true)
      const second = render()

      expect(first).toContain('Help content')
      expect(second).not.toContain('Help content')
      expect(second).not.toContain('aria-expanded="true"')
    })

    it('should show open help without contentId', () => {
      const html = renderToString(
        <HelpButtonInline
          help={{ title: 'Title', content: 'Help content', open: true }}
        />
      )

      expect(html).toContain('Help content')
      expect(html).toContain('aria-expanded="true"')
    })

    it('should show open help of a standalone field', () => {
      const html = renderToString(
        <Field.String
          label="Label"
          help={{ title: 'Title', content: 'Help content', open: true }}
        />
      )

      expect(html).toContain('Help content')
      expect(html).toContain('aria-expanded="true"')
    })
  })

  describe('Tabs', () => {
    const content = ({ key }: { key: string }) => `Panel ${key}`

    it('should not show the selected tab of an earlier render', () => {
      renderToString(
        <Tabs id="ssr-tabs" data={tabs} selectedKey="second" />
      )
      const html = renderToString(
        <Tabs.Content id="ssr-tabs">{content}</Tabs.Content>
      )

      expect(html).not.toContain('Panel second')
    })

    it('should show the selected tab in Tabs.Content inside the same Provider', () => {
      const html = renderToString(
        <SharedProvider>
          <Tabs id="ssr-tabs-provider" data={tabs} selectedKey="second" />
          <Tabs.Content id="ssr-tabs-provider">{content}</Tabs.Content>
        </SharedProvider>
      )

      expect(html).toContain('Panel second')
    })
  })

  describe('imperative helpers', () => {
    it('should warn and do nothing when Form.InfoOverlay.setContent runs on the server', () => {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {})

      Form.InfoOverlay.setContent('ssr-overlay', 'success')

      expect(log).toHaveBeenCalledTimes(1)
      expect(log.mock.calls[0].join(' ')).toContain(
        "Form.InfoOverlay.setContent('ssr-overlay') has no effect during server rendering"
      )
      expect(
        createSharedState(
          createReferenceKey('ssr-overlay', 'info-overlay')
        ).get()
      ).toBeUndefined()

      log.mockRestore()
    })

    it('should warn and do nothing when Form.clearData runs on the server', () => {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {})

      Form.clearData('ssr-clear')

      expect(log).toHaveBeenCalledTimes(1)
      expect(log.mock.calls[0].join(' ')).toContain(
        "Form.clearData('ssr-clear') has no effect during server rendering"
      )

      log.mockRestore()
    })
  })
})
