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

  describe('warnings for a missing Provider', () => {
    const logs = () =>
      vi.spyOn(console, 'log').mockImplementation(() => {})
    const text = (log: ReturnType<typeof logs>) =>
      log.mock.calls.map((call) => call.join(' ')).join('\n')

    function ShowData({ id }: { id: string }) {
      const { data } = Form.useData(id)
      return <output>{JSON.stringify(data)}</output>
    }

    function ShowDataWithoutSubscription({ id }: { id: string }) {
      const { getData } = Form.useDataWithoutSubscription(id)
      return <output>{JSON.stringify(getData())}</output>
    }

    const formAnd = (id: string, reader: React.ReactNode) => (
      <>
        <Form.Handler id={id} defaultData={{ a: 'Data' }}>
          <Field.String path="/a" />
        </Form.Handler>
        {reader}
      </>
    )

    it('should warn when Form.useData outside Form.Handler has no Provider', () => {
      const log = logs()

      renderToString(
        formAnd('ssr-warn-data', <ShowData id="ssr-warn-data" />)
      )

      expect(text(log)).toContain(
        "Form.useData('ssr-warn-data') gets no data from other components during server rendering"
      )
      log.mockRestore()
    })

    it('should warn when Form.useDataWithoutSubscription outside Form.Handler has no Provider', () => {
      const log = logs()

      renderToString(
        formAnd(
          'ssr-warn-data-ws',
          <ShowDataWithoutSubscription id="ssr-warn-data-ws" />
        )
      )

      expect(text(log)).toContain(
        "Form.useDataWithoutSubscription('ssr-warn-data-ws') gets no data from other components during server rendering"
      )
      log.mockRestore()
    })

    it('should not warn for Form.useData inside a Provider or inside Form.Handler', () => {
      const log = logs()

      const html = renderToString(
        <>
          <SharedProvider>
            {formAnd(
              'ssr-warn-data-provider',
              <ShowData id="ssr-warn-data-provider" />
            )}
          </SharedProvider>
          <Form.Handler
            id="ssr-warn-data-inside"
            defaultData={{ a: 'In' }}
          >
            <ShowData id="ssr-warn-data-inside" />
          </Form.Handler>
        </>
      )

      expect(html).toContain('{&quot;a&quot;:&quot;Data&quot;}')
      expect(html).toContain('{&quot;a&quot;:&quot;In&quot;}')
      expect(text(log)).not.toContain('Form.useData')
      log.mockRestore()
    })

    it('should warn when Tabs.Content has no Provider', () => {
      const log = logs()

      renderToString(
        <>
          <Tabs id="ssr-warn-tabs" data={tabs} selectedKey="second" />
          <Tabs.Content id="ssr-warn-tabs">{() => 'Panel'}</Tabs.Content>
        </>
      )

      expect(text(log)).toContain(
        "Tabs.Content('ssr-warn-tabs') does not get the selected tab during server rendering"
      )
      log.mockRestore()
    })

    it('should not warn for Tabs.Content inside a Provider or for the content of Tabs', () => {
      const log = logs()

      renderToString(
        <>
          <SharedProvider>
            <Tabs id="ssr-warn-tabs-provider" data={tabs} />
            <Tabs.Content id="ssr-warn-tabs-provider">
              {() => 'Panel'}
            </Tabs.Content>
          </SharedProvider>

          <Tabs
            id="ssr-warn-tabs-own"
            data={[
              { title: 'First', key: 'first', content: 'Own first' },
              { title: 'Second', key: 'second', content: 'Own second' },
            ]}
          />
        </>
      )

      expect(text(log)).not.toContain('Tabs.Content')
      log.mockRestore()
    })

    it('should warn when Form.Outlet outside its Form.Handler has no Provider', () => {
      const log = logs()

      const html = renderToString(
        formAnd(
          'ssr-warn-outlet',
          <Form.Outlet formHandlerId="ssr-warn-outlet">
            <output>Outlet content</output>
          </Form.Outlet>
        )
      )

      expect(html).not.toContain('Outlet content')
      expect(text(log)).toContain(
        "Form.Outlet('ssr-warn-outlet') renders nothing during server rendering"
      )
      log.mockRestore()
    })

    it('should not warn for Form.Outlet inside a Provider or inside its Form.Handler', () => {
      const log = logs()

      const html = renderToString(
        <>
          <SharedProvider>
            {formAnd(
              'ssr-warn-outlet-provider',
              <Form.Outlet formHandlerId="ssr-warn-outlet-provider">
                <output>Provider outlet</output>
              </Form.Outlet>
            )}
          </SharedProvider>
          <Form.Handler id="ssr-warn-outlet-inside">
            <Form.Outlet formHandlerId="ssr-warn-outlet-inside">
              <output>Inside outlet</output>
            </Form.Outlet>
          </Form.Handler>
        </>
      )

      expect(html).toContain('Provider outlet')
      expect(html).toContain('Inside outlet')
      expect(text(log)).not.toContain('Form.Outlet')
      log.mockRestore()
    })
  })
})
